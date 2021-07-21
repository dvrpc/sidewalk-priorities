import { sw_filter, osm_filter } from "./layers.js";
import { reloadGeojson } from "./api.js";

const title_cased_text = (badly_formatted_text) => {
  /**
   * Camel case the input text.
   * e.g.: convert 'ALL CAPS' into 'All Caps'
   *
   * @param {string} badly_formatted_text - Input text
   * @return {string}
   */
  return badly_formatted_text
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ");
};

const convert_ratio_to_text = (ratio_as_float) => {
  /**
   * Convert a ratio (0 to 1) into an appropriate text value
   * Steps:
   *  - multiply ratio by 100
   *  - round values over 100 down to 100
   *  - return a rounded number with percent sign, or "no" if the ratio is zero
   *
   * @param {number} ratio_as_float - a float value between zero and one
   * @return {string} - something like '95.4%' or 'No'
   */
  var ratio_multiplied = ratio_as_float * 100;

  if (ratio_multiplied > 100) {
    ratio_multiplied = 100;
  }
  if (ratio_multiplied == 100) {
    var ratio_text = "100%";
  } else if (ratio_multiplied == 0) {
    var ratio_text = "No";
  } else {
    var ratio_text = String(ratio_multiplied.toFixed(1)) + "%";
  }

  return ratio_text;
};

const poi_click = (map) => {
  /**
   * Handle click events for the 'all_pois' layer
   * Steps after user clicks:
   *  - reload missing links layer via API for this POI ID
   *  - filter tileset layers for this POI ID
   *  - zoom in to the clicked point
   *  - populate the sidebar div with related text info
   *  - set visibility properties on necessary layers and divs so that they appear
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  map.on("click", "all_pois", function (e) {
    var props = e.features[0].properties;

    var id_filter = ["in", "eta_uid", props.eta_uid];
    var id_filter_as_string = ["in", "eta_uid", props.eta_uid.toString()];

    // Get links within walkshed from API
    reloadGeojson(map, props.eta_uid);

    map.setFilter("iso_sw", ["all", id_filter_as_string, sw_filter]);
    map.setFilter("iso_osm", ["all", id_filter_as_string, osm_filter]);
    map.setFilter("selected_poi", id_filter);

    map.flyTo({
      center: e.lngLat,
      zoom: 14,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    // Make sure the user's cursor is no longer the pointer finger
    map.getCanvas().style.cursor = "";

    // Populate the sidebar div for the selected station
    var poiName = document.getElementById("selected-poi-name");
    poiName.innerHTML = title_cased_text(props.name);

    var poiRatio = document.getElementById("selected-poi-ratio");
    poiRatio.innerHTML =
      convert_ratio_to_text(props.ab_ratio) + " sidewalk coverage";

    // Allow the filtered layers to appear
    map.setPaintProperty("iso_sw", "fill-opacity", 0.4);
    map.setPaintProperty("iso_osm", "fill-opacity", 0.2);
    map.setPaintProperty("selected_poi", "circle-stroke-opacity", 1);

    // Show the info box for this POI
    var infoBox = document.getElementById("info-box");
    infoBox.style.setProperty("visibility", "visible");
  });
};

export { poi_click };
