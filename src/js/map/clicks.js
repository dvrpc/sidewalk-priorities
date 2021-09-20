import { sw_filter, osm_filter } from "./layers.js";
import {
  reload_gaps_near_poi,
  reload_pois_near_gap,
  reload_pois_near_sw,
} from "./api.js";
import { title_cased_text, convert_ratio_to_text } from "./text.js";
import { update_graph_with_api_data } from "./graph.js";
import {
  hide_extra_ui_boxes,
  hide_osm_isos,
  hide_layers,
  show_element,
  hide_element,
  set_text_to_div,
  hide_layers_from_gap_selection,
  filter_osm_iso_layers_by_id,
  filter_poi_layers_by_id,
  show_osm_iso_layers,
  show_list_item,
} from "./switches.js";
import { sw_zoom_threshold } from "./hover.js";

const gap_click_logic = (map, uid, map_center, island_count) => {
  var id_filter = ["in", "uid", uid];

  map.setFilter("clicked_gap", id_filter);
  map.setPaintProperty("clicked_gap", "line-opacity", 0.8);

  map.flyTo({
    center: map_center,
    zoom: 15,
    essential: true,
  });

  hide_osm_isos(map);
  map.setFilter("selected_poi", ["==", "type", "none"]);

  let text = "";
  if (island_count < 1) {
    text = "add to the sidewalk network where none currently exists";
  } else if (island_count == 1) {
    text =
      'extend the coverage of  <span class="green-text" style="font-weight: bold">one</span> existing island';
  } else {
    text =
      'connect <span class="green-text" style="font-weight: bold">' +
      island_count +
      "</span> existing sidewalk islands";
  }

  set_text_to_div(text, "stat-island");
  show_list_item("stat-island");

  set_text_to_div("Filling this gap could:", "gap-header");
  reload_pois_near_gap(map, uid);

  show_element("stat-box");
  hide_element("info-box");
  hide_element("walkshed-legend");
  show_element("selected-legend");
};

const poi_click_logic = (
  map,
  graph,
  poi_uid,
  map_center,
  poi_name,
  ab_ratio
) => {
  hide_layers_from_gap_selection(map);

  var poi_uid = parseInt(poi_uid);

  reload_gaps_near_poi(map, poi_uid);

  update_graph_with_api_data(graph, poi_uid);

  filter_osm_iso_layers_by_id(map, poi_uid);

  filter_poi_layers_by_id(map, poi_uid);

  map.flyTo({
    center: map_center,
    zoom: 14,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });

  // Make sure the user's cursor is no longer the pointer finger
  map.getCanvas().style.cursor = "";

  // Populate the sidebar div for the selected station
  let poi_text = "@ " + title_cased_text(decodeURI(poi_name));
  set_text_to_div(poi_text, "subtitle");

  let ratio_text = convert_ratio_to_text(ab_ratio) + " sidewalk coverage";
  set_text_to_div(ratio_text, "selected-poi-ratio");

  map.setPaintProperty("selected_poi", "circle-stroke-opacity", 1);

  show_element("info-box");
  show_element("walkshed-legend");
  show_element("gap-legend");
  hide_element("stat-box");
  hide_element("selected-legend");
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

    poi_click_logic(
      map,
      graph,
      props.poi_uid,
      e.lngLat,
      props.poi_name,
      props.ab_ratio
    );
  });
};

const gap_click = (map) => {
  /**
   */
  map.on("click", "gaps", function (e) {
    var props = e.features[0].properties;

    gap_click_logic(map, props.uid, e.lngLat, props.island_count);
  });
};

const sw_click = (map) => {
  map.on("click", "sw", function (e) {
    var props = e.features[0].properties;
    console.log(props);

    if (map.getZoom() > sw_zoom_threshold) {
      reload_pois_near_sw(map, e.lngLat);

      hide_osm_isos(map);
      map.setFilter("selected_poi", ["==", "type", "none"]);

      map.setPaintProperty("clicked_gap", "line-opacity", 0);

      set_text_to_div("This existing sidewalk:", "gap-header");

      hide_element("stat-island");

      show_element("stat-box");
      hide_element("info-box");
      hide_element("walkshed-legend");
      show_element("selected-legend");
    }
  });
};
export { poi_click, poi_click_logic, gap_click, sw_click };
