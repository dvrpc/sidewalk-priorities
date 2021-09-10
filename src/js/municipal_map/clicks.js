import { sw_filter, osm_filter } from "./layers.js";
import { reloadGeojson } from "./api.js";
import { title_cased_text, convert_ratio_to_text } from "./text.js";
import { update_graph_with_api_data } from "./graph.js";
import { api_url_base } from "./api.js";

const gap_click = (map) => {
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
  map.on("click", "gap-layer", function (e) {
    var props = e.features[0].properties;

    console.log(props);

    var id_filter = ["in", "uid", props.uid];
    console.log(id_filter);
    map.setFilter("clicked-gap", id_filter);
    // var iso_filter = ["in", "eta_uid", props.poi_uid.toString()];

    // console.log(iso_filter);

    // // Get links within walkshed from API
    // reloadGeojson(map, props.poi_uid);

    // update_graph_with_api_data(graph, props.poi_uid);

    // map.setFilter("iso_sw", ["all", iso_filter, sw_filter]);
    // map.setFilter("iso_sw_outline", ["all", iso_filter, sw_filter]);
    // map.setFilter("iso_osm", ["all", iso_filter, osm_filter]);
    // map.setFilter("iso_osm_outline", ["all", iso_filter, osm_filter]);

    // map.setFilter("selected_poi", id_filter);

    map.flyTo({
      center: e.lngLat,
      zoom: 15,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    var stat_island = document.getElementById("stat-island");
    if (props.island_count < 1) {
      stat_island.innerHTML =
        "add to the sidewalk network where none currently exists";
    } else if (props.island_count == 1) {
      stat_island.innerHTML =
        'extend the coverage of  <span class="green-text" style="font-weight: bold">one</span> existing island';
    } else {
      stat_island.innerHTML =
        'connect <span class="green-text" style="font-weight: bold">' +
        props.island_count +
        "</span> existing sidewalk islands";
    }

    let gap_url =
      api_url_base() + "/sidewalk/pois-near-gap/?q=" + props.uid.toString();

    var request = new XMLHttpRequest();
    request.open("GET", gap_url, true);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // retrieve the JSON from the response
        var json = JSON.parse(this.response);

        var num_pois = Object.keys(json.features).length;

        map.getSource("selected_poi_data").setData(json);
        map.setPaintProperty("selected_pois", "circle-stroke-opacity", 1);
        map.setPaintProperty("selected_pois", "circle-opacity", 1);

        var stat_dest = document.getElementById("stat-destinations");
        stat_dest.innerHTML =
          'improve pedestrian connectivity to <span class="green-text" style="font-weight: bold">' +
          num_pois +
          "</span> destinations";
      }
    };
    request.send();

    // // Make sure the user's cursor is no longer the pointer finger
    // map.getCanvas().style.cursor = "";

    // var poiRatio = document.getElementById("selected-poi-ratio");
    // poiRatio.innerHTML =
    //   convert_ratio_to_text(props.ab_ratio) + " sidewalk coverage";

    // // Allow the filtered layers to appear
    // map.setPaintProperty("iso_sw", "fill-opacity", 0.7);
    // map.setPaintProperty("iso_osm", "fill-opacity", 0.7);

    // map.setPaintProperty("iso_sw_outline", "line-opacity", 0.9);
    // map.setPaintProperty("iso_osm_outline", "line-opacity", 0.9);

    // map.setPaintProperty("selected_poi", "circle-stroke-opacity", 0.5);

    // Show the info box for this POI
    var infoBox = document.getElementById("stat-box");
    infoBox.style.setProperty("visibility", "visible");

    // // Show the secondary legend
    // var legend = document.getElementById("walkshed-legend");
    // legend.style.setProperty("display", "inline");
  });
};

export { gap_click };
