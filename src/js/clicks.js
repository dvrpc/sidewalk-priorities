import { sw_filter, osm_filter } from "./layers.js";
import { bindPopup, poi_message } from "./popup";
import { reloadGeojson } from "./api.js";

const poi_click = (map) => {
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
      zoom: 13,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    // Make sure the user's cursor is no longer the pointer finger
    map.getCanvas().style.cursor = "";

    // Show the popup
    var msg = poi_message(e);
    bindPopup(map, msg, e);

    // Allow the filtered layers to appear
    map.setPaintProperty("iso_sw", "fill-opacity", 0.4);
    map.setPaintProperty("iso_osm", "fill-opacity", 0.2);
    map.setPaintProperty("selected_poi", "circle-stroke-opacity", 1);

    // Show the distance selection slider
    var sliderbox = document.getElementById("slider-box");
    sliderbox.style.setProperty("visibility", "visible");
  });
};

export { poi_click };
