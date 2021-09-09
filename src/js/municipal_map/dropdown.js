// import { clearPopups } from "./popup.js";
import { reloadGeojson } from "./api.js";

const wire_dropdown_behavior = (map) => {
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

  var dropdown = document.getElementById("dropdown_muni");

  dropdown.addEventListener("change", function () {
    var muni_name = dropdown.value;

    reloadGeojson(map, muni_name);
  });
};

export { wire_dropdown_behavior };
