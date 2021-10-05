import { clearPopups } from "./popup.js";
import {
  fly_to_muni_centroid,
  reload_selected_muni,
  reload_gaps_within_muni,
} from "./api.js";
import {
  hide_extra_ui_boxes,
  hide_layers,
  show_element,
  show_element_inline,
  hide_element,
  set_text_to_div,
} from "./switches.js";
import { remove_markers } from "./markers.js";
import { pois_as_many_items } from "./text.js";

const wire_poi_dropdown_behavior = (map) => {
  /**
   * Set up the behavior for the dropdown selector
   *
   * Steps:
   *    - User changes selected POI type
   *    - Page subtitle gets updated
   *    - POI layer is filtered to the selected type
   *    - Isochrones, missing link layers, and POI info box are hidden
   *    - Popups are removed (if present)
   *    - Map is zoomed back out to the county extent
   */

  var dropdown = document.getElementById("dropdown_category");

  dropdown.addEventListener("change", function () {
    // Set the subtitle text
    let text = pois_as_many_items[dropdown.value];
    set_text_to_div("@ " + text, "subtitle");

    if (dropdown.value == "all") {
      var filter = null;
    } else {
      var filter = ["==", "category", dropdown.value];
    }
    map.setFilter("all_pois", filter);

    hide_layers(map);

    hide_extra_ui_boxes();

    hide_element("walkshed-legend");

    // Hide the selected muni
    map.setPaintProperty("selected-municipality", "line-opacity", 0);

    clearPopups();

    var muni_dropdown = document.getElementById("dropdown_muni");
    muni_dropdown.value = "...";

    remove_markers();

    // Fly back to county zoom level
    map.flyTo({
      center: [-75.36277290123333, 40.201296611075346],
      zoom: 10,
      essential: true,
    });

    hide_element("gap-legend");
    hide_element("text-about-gap-click");
  });
};

const wire_muni_dropdown_behavior = (map) => {
  /**
   * Set up the behavior for the dropdown selector
   */

  var dropdown = document.getElementById("dropdown_muni");

  dropdown.addEventListener("change", function () {
    var muni_name = dropdown.value;
    set_text_to_div("in " + muni_name, "subtitle");

    reload_selected_muni(map, muni_name);
    reload_gaps_within_muni(map, muni_name);

    fly_to_muni_centroid(map, muni_name);

    hide_layers(map);
    show_element("gap-legend");
    remove_markers();

    show_element_inline("text-about-gap-click");
  });
};

export { wire_poi_dropdown_behavior, wire_muni_dropdown_behavior };
