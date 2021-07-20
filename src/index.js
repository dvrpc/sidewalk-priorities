import "./css/style.css";
import { data_sources } from "./js/sources.js";
import { poi_click } from "./js/clicks.js";
import { wire_mouse_hover } from "./js/hover.js";
import { makeMap } from "./js/map.js";
import { map_layers } from "./js/layers.js";
import { paint_props } from "./js/paint_props";
import { initialGeojsonLoad } from "./js/api.js";

const map = makeMap();

map.on("load", function () {
  // Find the index of the first symbol layer in the map style
  // This becomes an argument in map.addLayer and allows the
  // basemap labels to draw on top of the vector layers
  var base_layers = map.getStyle().layers;
  var firstSymbolId;

  for (var i = 0; i < base_layers.length; i++) {
    if (base_layers[i].type === "symbol") {
      firstSymbolId = base_layers[i].id;
      break;
    }
  }

  // Add map data sources and layer styling
  for (const src in data_sources) map.addSource(src, data_sources[src]);
  for (const lyr in map_layers) map.addLayer(map_layers[lyr], "road-label");

  // Add initial geojson layer from API
  initialGeojsonLoad(map, "road-label");

  // Load scale-based paint properties
  for (const paint in paint_props)
    map.setPaintProperty(
      paint_props[paint].id,
      paint_props[paint].attribute,
      paint_props[paint].style
    );

  poi_click(map);
  wire_mouse_hover(map);

  //   // Set hover interactions
  //   add_map_hover_styles(map);
  //   // Set click interactions
  //   add_map_click_actions(map, bar_chart);
});

// Selector change

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

  // Hide the distance selection slider
  var sliderbox = document.getElementById("slider-box");
  sliderbox.style.setProperty("visibility", "hidden");

  // Remove any popups that may exist
  const popup = document.getElementsByClassName("mapboxgl-popup");
  if (popup.length) {
    popup[0].remove();
  }

  // Fly back to county zoom level
  map.flyTo({
    center: [-75.36277290123333, 40.201296611075346],
    zoom: 10,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });
});
