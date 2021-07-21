import "./css/style.css";
import { data_sources } from "./js/sources.js";
import { poi_click } from "./js/clicks.js";
import { wire_mouse_hover } from "./js/hover.js";
import { makeMap } from "./js/map.js";
import { map_layers_group_1, map_layers_group_2 } from "./js/layers.js";
import { paint_props } from "./js/paint_props";
import { initialGeojsonLoad } from "./js/api.js";
import { wire_dropdown_behavior } from "./js/dropdown";

const map = makeMap();

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
  poi_click(map);
  wire_mouse_hover(map);

  // Wire up the dropdown behavior
  wire_dropdown_behavior(map);
});
