import "./css/style.css";
import { get_query_params } from "./js/query.js";
import { data_sources } from "./js/map/sources.js";
import {
  poi_click,
  poi_click_logic,
  gap_click,
  sw_click,
} from "./js/map/clicks.js";
import { wire_mouse_hover } from "./js/map/hover.js";
import { makeMap } from "./js/map/map.js";
import { map_layers_group_1, map_layers_group_2 } from "./js/map/layers.js";
import { paint_props } from "./js/map/paint_props";
import { initialGeojsonLoad } from "./js/map/api.js";
import {
  wire_poi_dropdown_behavior,
  wire_muni_dropdown_behavior,
} from "./js/map/dropdown";
import { update_graph_with_api_data, makeGraph } from "./js/map/graph.js";

const map = makeMap();
const bar_chart = makeGraph();

map.on("load", function () {
  /**
   * Wire up the logic defined within the sub-modules under the /src/js folder
   *
   * This includes:
   *  - Loading tile sources
   *  - Adding initial tile layers
   *  - Loading initial geojson response from API
   *  - Finish loading the remaining tile layers
   *  - Assign scale-based paint properties
   *  - Wire up click and hover events
   *  - Wire up dropdown selector
   */

  update_graph_with_api_data(bar_chart, "1007");

  // Add map data sources and layer styling
  for (const src in data_sources) map.addSource(src, data_sources[src]);
  for (const lyr in map_layers_group_1)
    map.addLayer(map_layers_group_1[lyr], "road-label");

  // Add initial geojson layer from API
  initialGeojsonLoad(map, "road-label");

  // Add additional tilesets on top of geojson API layer
  for (const lyr in map_layers_group_2)
    map.addLayer(map_layers_group_2[lyr], "road-label");

  // Load scale-based paint properties
  for (const paint in paint_props)
    map.setPaintProperty(
      paint_props[paint].id,
      paint_props[paint].attribute,
      paint_props[paint].style
    );

  // Wire up click and hover interactions
  poi_click(map, bar_chart);
  gap_click(map);
  sw_click(map);
  wire_mouse_hover(map);

  // Wire up the dropdown behavior
  wire_poi_dropdown_behavior(map);
  wire_muni_dropdown_behavior(map);

  let params = get_query_params();
  if (params) {
    console.log(params);
    poi_click_logic(
      map,
      bar_chart,
      params.id,
      [params.lng, params.lat],
      params.name.replace("_", " "),
      params.ab_ratio
    );
  }
});
