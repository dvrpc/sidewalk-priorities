import { sw_filter, osm_filter } from "./layers.js";

// HIDE THINGS FROM VIEW
// ---------------------

const hide_extra_ui_boxes = () => {
  // Hide the info & stat boxes

  let box_names = ["info-box", "stat-box"];

  box_names.forEach((item) => {
    let box = document.getElementById(item);
    box.style.setProperty("display", "none");
  });
};

const hide_osm_isos = (map) => {
  // Hide the OSM isochrone layers
  let layer_names = ["iso_sw", "iso_osm", "iso_sw_outline", "iso_osm_outline"];

  layer_names.forEach((item) => {
    map.setFilter(item, ["==", "src_network", "none"]);
  });
};

const hide_layers_from_gap_selection = (map) => {
  // Hide the layers that show the gap a user clicked on
  map.setPaintProperty("clicked_gap", "line-opacity", 0);
  map.setPaintProperty("selected_pois", "circle-stroke-opacity", 0);
  hide_element("text-about-gap-click");
};

const hide_layers = (map) => {
  // Hide all extra layers to return the map to a clean slate

  hide_osm_isos(map);

  // LINE LAYERS
  let line_opacity_layers = ["gaps", "clicked_gap", "selected-municipality"];
  line_opacity_layers.forEach((item) => {
    map.setPaintProperty(item, "line-opacity", 0);
  });

  // POINT LAYERS w/ OUTLINE STYLE
  let stroke_opacity_layers = ["selected_poi", "selected_pois"];
  stroke_opacity_layers.forEach((item) => {
    map.setPaintProperty(item, "circle-stroke-opacity", 0);
  });

  // ENTRYPOINTS FOR SELECTED POI
  map.setFilter("selected_poi_entrypoints", [
    "==",
    "type",
    "none - this filter should return zero results",
  ]);
};

const hide_element = (div_id) => {
  // Set the display to 'none' for a given div_id
  let element = document.getElementById(div_id);
  element.style.setProperty("display", "none");
};

// TURN THINGS ON
// --------------

const show_element = (div_id) => {
  // Set the display to 'block' for a given div_id
  let element = document.getElementById(div_id);
  element.style.setProperty("display", "block");
};

const show_element_inline = (div_id) => {
  // Set the display to 'block' for a given div_id
  let element = document.getElementById(div_id);
  element.style.setProperty("display", "inline");
};

const show_list_item = (div_id) => {
  // Set the display to 'list-item' for a given div_id
  let element = document.getElementById(div_id);
  element.style.setProperty("display", "list-item");
};

const show_osm_iso_layers = (map) => {
  // Set the opacity on the OSM iso polygons to be visible

  map.setPaintProperty("iso_sw", "fill-opacity", 0.7);
  map.setPaintProperty("iso_osm", "fill-opacity", 0.7);

  map.setPaintProperty("iso_sw_outline", "line-opacity", 0.9);
  map.setPaintProperty("iso_osm_outline", "line-opacity", 0.9);
};

// CHANGE THINGS ON THE SCREEN
// ---------------------------

const set_text_to_div = (text, div_id) => {
  // Set a div's HTML to the provided text
  let element = document.getElementById(div_id);
  element.innerHTML = text;
};

const filter_osm_iso_layers_by_id = (map, poi_uid) => {
  // Update filter on OSM isochrones to show for one POI
  let iso_filter = ["in", "eta_uid", poi_uid.toString()];

  map.setFilter("iso_sw", ["all", iso_filter, sw_filter]);
  map.setFilter("iso_sw_outline", ["all", iso_filter, sw_filter]);
  map.setFilter("iso_osm", ["all", iso_filter, osm_filter]);
  map.setFilter("iso_osm_outline", ["all", iso_filter, osm_filter]);

  // Show them
  show_osm_iso_layers(map);
};

const filter_poi_layers_by_id = (map, poi_uid) => {
  // Update filter on selected POI layers

  var id_filter = ["in", "poi_uid", parseInt(poi_uid)];
  map.setFilter("selected_poi", id_filter);
  map.setFilter("selected_poi_entrypoints", id_filter);
};

export {
  hide_extra_ui_boxes,
  hide_layers,
  hide_element,
  show_element,
  show_element_inline,
  set_text_to_div,
  hide_osm_isos,
  hide_layers_from_gap_selection,
  filter_osm_iso_layers_by_id,
  filter_poi_layers_by_id,
  show_osm_iso_layers,
  show_list_item,
};
