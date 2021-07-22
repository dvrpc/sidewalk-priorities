import { clearPopups } from "./popup.js";

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

  var dropdown = document.getElementById("dropdown_category");
  var subtitle = document.getElementById("subtitle");

  var subtitle_text = {
    all: "All Points of Interest",
    "School - Public": "Public Schools",
    "School - Private": "Private Schools",
    "School - College, University": "Colleges/Universities",
    "Health Facility": "Health Care Facilities",
    "Food Store": "Food Stores",
    "Activity Center for Seniors or Disabled":
      "Activity Centers for Senior/Disabled",
  };

  dropdown.addEventListener("change", function () {
    // Set the subtitle text
    subtitle.innerHTML = subtitle_text[dropdown.value];

    if (dropdown.value == "all") {
      // map.setFilter("all_pois");
      var filter = null;
    } else {
      var filter = ["==", "type", dropdown.value];
    }
    map.setFilter("all_pois", filter);

    // Filter out the selected layers so no features appear
    map.setFilter("iso_sw", ["==", "src_network", "none"]);
    map.setFilter("iso_osm", ["==", "src_network", "none"]);
    map.setFilter("selected_poi", ["==", "type", "none"]);
    map.setPaintProperty("missing-links-for-selected-poi", "line-opacity", 0);

    // Hide the info box
    var infoBox = document.getElementById("info-box");
    infoBox.style.setProperty("visibility", "hidden");

    clearPopups();

    // Fly back to county zoom level
    map.flyTo({
      center: [-75.36277290123333, 40.201296611075346],
      zoom: 10,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  });
};

export { wire_dropdown_behavior };
