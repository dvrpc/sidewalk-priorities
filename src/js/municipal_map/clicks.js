import { api_url_base } from "./api.js";

const hyperlink_base = () => {
  /**
   * Read the URL base for hyperlinking within the app
   */
  var current_url = window.location.href;

  // Remove everything after the final slash
  var url_as_list = current_url.split("/");
  url_as_list.pop();
  var base_url = url_as_list.join("/");

  return base_url;
};

const handle_selected_gap = (map, uid, map_center, island_count) => {
  var id_filter = ["in", "uid", uid];

  map.setFilter("clicked_gap", id_filter);
  map.setPaintProperty("clicked_gap", "line-opacity", 1);

  map.flyTo({
    center: map_center,
    zoom: 15,
    essential: true,
  });

  var stat_island = document.getElementById("stat-island");
  if (island_count < 1) {
    stat_island.innerHTML =
      "add to the sidewalk network where none currently exists";
  } else if (island_count == 1) {
    stat_island.innerHTML =
      'extend the coverage of  <span class="green-text" style="font-weight: bold">one</span> existing island';
  } else {
    stat_island.innerHTML =
      'connect <span class="green-text" style="font-weight: bold">' +
      island_count +
      "</span> existing sidewalk islands";
  }

  let gap_url = api_url_base() + "/sidewalk/pois-near-gap/?q=" + uid.toString();

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
};

const gap_click = (map) => {
  /**
   * Handle click events for the 'gap-layer'
   */
  map.on("click", "gaps", function (e) {
    var props = e.features[0].properties;

    console.log(props);
    handle_selected_gap(map, props.uid, e.lngLat, props.island_count);
  });
};

const poi_click = (map) => {
  map.on("click", "all_pois", function (e) {
    var props = e.features[0].properties;
    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;

    let url =
      hyperlink_base() +
      "/by-destination.html?lat=" +
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

export { gap_click, poi_click, handle_selected_gap };
