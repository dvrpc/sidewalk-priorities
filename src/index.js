import "./css/style.css";
import { data_sources } from "./js/sources.js";
import { poi_click } from "./js/clicks.js";

// import { urlRoot } from "./api";

import { makeMap } from "./js/map.js";
// import {
//   wire_up_dropdown_selector,
//   add_map_hover_styles,
//   add_map_click_actions,
// } from "./user_interaction";
import { map_layers } from "./js/layers.js";

const map = makeMap();

map.on("load", function () {
  // Add map data sources and layer styling
  for (const src in data_sources) map.addSource(src, data_sources[src]);
  for (const lyr in map_layers) map.addLayer(map_layers[lyr]);

  poi_click(map);

  //   // Set hover interactions
  //   add_map_hover_styles(map);
  //   // Set click interactions
  //   add_map_click_actions(map, bar_chart);
});
