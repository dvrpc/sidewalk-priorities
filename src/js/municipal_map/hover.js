import { title_cased_text, convert_ratio_to_text } from "./text.js";
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

const wire_mouse_hover = (map) => {
  /**
   * Show interactivity tooltip hints for all layers defined within
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  var layers = ["gap-layer", "all_pois"];

  layers.forEach((lyr) => wire_single_layer(map, lyr));

  // Add popup with name of POI when hovering
  map.on("mouseenter", "gap-layer", function (e) {
    var msg = "<h3>Click this gap to learn more</h3>";
    bindPopup(map, msg, e);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "gap-layer", function (e) {
    clearPopups();
  });

  // Add popup with name of POI when hovering
  map.on("mouseenter", "all_pois", function (e) {
    var props = e.features[0].properties;

    var msg =
      "<h3 class='green-text'>" + title_cased_text(props.poi_name) + "</h3>";
    msg +=
      "<p style='text-align: center;'>" +
      convert_ratio_to_text(props.ab_ratio) +
      " sidewalk coverage</p>";
    bindPopup(map, msg, e);
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", "all_pois", function (e) {
    clearPopups();
  });
};

export { wire_mouse_hover };
