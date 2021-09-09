import "./css/style.css";
import { data_sources } from "./js/destination_map/sources.js";
import { poi_click } from "./js/destination_map/clicks.js";
import { wire_mouse_hover } from "./js/destination_map/hover.js";
import { makeMap } from "./js/destination_map/map.js";
import {
  map_layers_group_1,
  map_layers_group_2,
} from "./js/destination_map/layers.js";
import { paint_props } from "./js/destination_map/paint_props";
import { initialGeojsonLoad } from "./js/destination_map/api.js";
import { wire_dropdown_behavior } from "./js/destination_map/dropdown";
import {
  update_graph_with_api_data,
  makeGraph,
} from "./js/destination_map/graph.js";

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
  wire_mouse_hover(map);

  // Wire up the dropdown behavior
  wire_dropdown_behavior(map);
});
