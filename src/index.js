import "./css/style.css";
import { data_sources } from "./js/sources.js";
import { poi_click } from "./js/clicks.js";
import { wire_mouse_hover } from "./js/hover.js";
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
  // Find the index of the first symbol layer in the map style
  // This becomes an argument in map.addLayer and allows the
  // basemap labels to draw on top of the vector layers
  var base_layers = map.getStyle().layers;
  var firstSymbolId;

  console.log(map.getStyle());
  for (var i = 0; i < base_layers.length; i++) {
    console.log(base_layers[i]);
    if (base_layers[i].type === "symbol") {
      firstSymbolId = base_layers[i].id;
      break;
    }
  }

  console.log("FIRST SYMBOL ID!!!");

  console.log(firstSymbolId);

  // Add map data sources and layer styling
  for (const src in data_sources) map.addSource(src, data_sources[src]);
  for (const lyr in map_layers) map.addLayer(map_layers[lyr], "road-label");

  poi_click(map);
  wire_mouse_hover(map);

  //   // Set hover interactions
  //   add_map_hover_styles(map);
  //   // Set click interactions
  //   add_map_click_actions(map, bar_chart);
});

// Selector change

var dropdown = document.getElementById("dropdown_category");

dropdown.addEventListener("change", function () {
  if (dropdown.value == "all") {
    // map.setFilter("all_pois");
    var filter = null;
  } else {
    var filter = ["all", ["==", "type", dropdown.value]];
  }
  map.setFilter("all_pois", filter);
});
