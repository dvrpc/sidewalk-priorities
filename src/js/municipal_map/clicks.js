import { api_url_base } from "./api.js";

const gap_click = (map) => {
  /**
   * Handle click events for the 'gap-layer'
   */
  map.on("click", "gap-layer", function (e) {
    var props = e.features[0].properties;

    console.log(props);

    var id_filter = ["in", "uid", props.uid];
    console.log(id_filter);
    map.setFilter("clicked-gap", id_filter);

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

    // Show the info box for this POI
    var infoBox = document.getElementById("stat-box");
    infoBox.style.setProperty("visibility", "visible");
  });
};

const poi_click = (map) => {
  map.on("click", "all_pois", function (e) {
    var props = e.features[0].properties;
    console.log(props);
    console.log(e);

    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;

    let url =
      "by-destination.html?lat=" +
      lat +
      "&lng=" +
      lng +
      "&id=" +
      props.poi_uid +
      "&name=" +
      props.poi_name.replace(" ", "_") +
      "&ab_ratio=" +
      props.ab_ratio.toString();

    console.log(url);
    window.location.href = url;
  });
};

export { gap_click, poi_click };
