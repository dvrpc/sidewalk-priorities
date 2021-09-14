import { sw_filter, osm_filter } from "./layers.js";
import { reloadGeojson } from "./api.js";
import { title_cased_text, convert_ratio_to_text } from "./text.js";
import { update_graph_with_api_data } from "./graph.js";

const click_logic = (map, graph, poi_uid, map_center, poi_name, ab_ratio) => {
  var poi_uid = parseInt(poi_uid);
  var id_filter = ["in", "poi_uid", poi_uid];
  var iso_filter = ["in", "eta_uid", poi_uid.toString()];

  // Get links within walkshed from API
  reloadGeojson(map, poi_uid);

  update_graph_with_api_data(graph, poi_uid);

  map.setFilter("iso_sw", ["all", iso_filter, sw_filter]);
  map.setFilter("iso_sw_outline", ["all", iso_filter, sw_filter]);
  map.setFilter("iso_osm", ["all", iso_filter, osm_filter]);
  map.setFilter("iso_osm_outline", ["all", iso_filter, osm_filter]);

  map.setFilter("selected_poi", id_filter);
  map.setFilter("selected_poi_entrypoints", id_filter);

  map.flyTo({
    center: map_center,
    zoom: 14,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });

  // Make sure the user's cursor is no longer the pointer finger
  map.getCanvas().style.cursor = "";

  // Populate the sidebar div for the selected station
  var poiName = document.getElementById("selected-poi-name");
  poiName.innerHTML = title_cased_text(decodeURI(poi_name));

  var poiRatio = document.getElementById("selected-poi-ratio");
  poiRatio.innerHTML = convert_ratio_to_text(ab_ratio) + " sidewalk coverage";

  // Allow the filtered layers to appear
  map.setPaintProperty("iso_sw", "fill-opacity", 0.7);
  map.setPaintProperty("iso_osm", "fill-opacity", 0.7);

  map.setPaintProperty("iso_sw_outline", "line-opacity", 0.9);
  map.setPaintProperty("iso_osm_outline", "line-opacity", 0.9);

  map.setPaintProperty("selected_poi", "circle-stroke-opacity", 1);
  // map.setPaintProperty("selected_poi", "circle-opacity", 1);

  // Show the info box for this POI
  var infoBox = document.getElementById("info-box");
  infoBox.style.setProperty("visibility", "visible");

  // Show the secondary legend
  var legend = document.getElementById("walkshed-legend");
  legend.style.setProperty("display", "inline");
};

const poi_click = (map, graph) => {
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

    click_logic(
      map,
      graph,
      props.poi_uid,
      e.lngLat,
      props.poi_name,
      props.ab_ratio
    );
  });
};

export { poi_click, click_logic };
