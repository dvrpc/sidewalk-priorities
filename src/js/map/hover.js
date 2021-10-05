import {
  title_cased_text,
  convert_ratio_to_text,
  pois_as_singular_item,
} from "./text.js";
import { bindPopup, clearPopups } from "./popup.js";

const wire_single_layer = (map, layername) => {
  /**
   * For the provided layername, set the cursor to use a
   * pointer when hovering, and return to normal cursor when
   * you move the mouse away
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} layername - The name of the layer to assign the functionality to
   */

  // change mouse tip to pointer finger
  map.on(
    "mouseenter",
    layername,
    () => (map.getCanvas().style.cursor = "pointer")
  );

  // change mouse tip upon leaving feature
  map.on("mouseleave", layername, function (e) {
    map.getCanvas().style.cursor = "";
  });
};

const ZOOM_THRESHOLD_FOR_LINE_INTERACTION = 12.99;

const wire_mouse_hover = (map) => {
  /**
   * Show interactivity tooltip hints for all layers defined within
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  var layers = ["all_pois"];

  layers.forEach((lyr) => wire_single_layer(map, lyr));

  // Add popup with name of POI when hovering
  map.on("mouseenter", "all_pois", function (e) {
    var props = e.features[0].properties;
    var msg = "<h3>" + title_cased_text(props.poi_name) + "</h3>";
    msg +=
      "<p style='text-align: center;'> <span class='green-text bold'>" +
      pois_as_singular_item[props.category] +
      "</span><br />" +
      convert_ratio_to_text(props.ab_ratio) +
      " sidewalk coverage</p>";
    bindPopup(map, msg, e);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "all_pois", function (e) {
    clearPopups();
  });

  // Add popup letting user know that clicking gap will jump to the other map
  map.on("mouseenter", "gaps", function (e) {
    var msg =
      "<p class='italic centered'>Click this <span class='green-text'> gap </span> to learn more <br/> about nearby destinations</p>";

    if (map.getZoom() > ZOOM_THRESHOLD_FOR_LINE_INTERACTION) {
      map.getCanvas().style.cursor = "pointer";
      bindPopup(map, msg, e);
    }
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "gaps", function (e) {
    clearPopups();
    map.getCanvas().style.cursor = "";
  });

  // SIDEWALK features

  map.on("mouseenter", "sw", (e) => {
    if (map.getZoom() > ZOOM_THRESHOLD_FOR_LINE_INTERACTION) {
      map.getCanvas().style.cursor = "pointer";
      var msg =
        "<p class='italic centered'>Click this <span class='green-text'> existing sidewalk </span> to learn more <br/> about nearby destinations</p>";
      bindPopup(map, msg, e);
    }
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "sw", function (e) {
    map.getCanvas().style.cursor = "";
    clearPopups();
  });
};

export { wire_mouse_hover, ZOOM_THRESHOLD_FOR_LINE_INTERACTION };
