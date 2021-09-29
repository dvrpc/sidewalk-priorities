import { set_text_to_div } from "./switches.js";
import { nice_category_name_for_bullets } from "./text.js";

// GENERAL
// HELPER
// FUNCTIONS

const api_url_base = () => {
  /**
   * Read the current 'mode' variable from webpack
   * and the return the proper URL for the API
   *
   * e.g.:
   *  - development == locally hosted API
   *  - production == API hosted on DigitalOcean
   */
  var current_env = process.env.NODE_ENV;

  if (current_env == "development") {
    // var url = "https://omad-api-lf2k9.ondigitalocean.app";
    var url = "http://localhost:8000/api/mcosp/v1";
  } else {
    var url = "https://omad-api-lf2k9.ondigitalocean.app";
  }
  return url;
};

const load_data_and_layer_from_api_url = (
  map,
  url,
  layer_insertion_order,
  source_name,
  layer_config
) => {
  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      // add the geojson as a data source in the map
      map.addSource(source_name, {
        type: "geojson",
        data: json,
      });

      // add the layer using the config values provided
      map.addLayer(layer_config, layer_insertion_order);
    }
  };
  request.send();
};

// LOAD DATA
// ON INITIAL
// MAP LOAD

const load_munis = (map, layer_insertion_order) => {
  let url = api_url_base() + "/sidewalk/all-munis";
  let source_name = "all-munis";
  let layer_config = {
    id: "all-municipalities",
    type: "line",
    source: source_name,
    paint: {
      "line-color": "black",
      "line-opacity": 0.5,
      "line-width": 0.5,
    },
  };
  load_data_and_layer_from_api_url(
    map,
    url,
    layer_insertion_order,
    source_name,
    layer_config
  );
};

const load_one_muni = (map, layer_insertion_order) => {
  let url = api_url_base() + "/sidewalk/one-muni/?q=Abington%20Township";
  let source_name = "one-muni";
  let layer_config = {
    source: source_name,
    id: "selected-municipality",
    type: "line",
    paint: {
      "line-color": "pink",
      "line-opacity": 0,
      "line-width": 10,
    },
  };
  load_data_and_layer_from_api_url(
    map,
    url,
    layer_insertion_order,
    source_name,
    layer_config
  );
};

const load_pois_near_single_gap = (map, layer_insertion_order) => {
  let url = api_url_base() + "/sidewalk/pois-near-gap/?q=60943";
  let source_name = "selected-pois";
  let layer_config = {
    id: "selected_pois",
    type: "circle",
    source: source_name,
    paint: {
      "circle-radius": 15,
      "circle-opacity": 0,
      "circle-stroke-opacity": 0,
      "circle-color": "rgba(0,0,0,0)",
      "circle-stroke-width": 3,
      "circle-stroke-color": {
        property: "ab_ratio",
        default: "black",
        stops: [
          [0, "rgba(0, 0, 0, 1)"],
          [0.0001, "rgba(255, 0, 0, 1)"],
          [0.1, "rgba(255, 153, 0, 1)"],
          [0.5, "rgba(255, 255, 0, 1)"],
          [1, "rgba(0, 153, 0, 1)"],
        ],
      },
    },
  };
  load_data_and_layer_from_api_url(
    map,
    url,
    layer_insertion_order,
    source_name,
    layer_config
  );
};

const load_gaps = (map, layer_insertion_order) => {
  let url = api_url_base() + "/sidewalk/nearby-gaps/?q=60943";
  let source_name = "gap-lines";
  let blue_config = {
    id: "gaps",
    type: "line",
    source: source_name,
    paint: {
      "line-color": "rgb(57,83,164)",
      "line-opacity": 0,
      "line-width": {
        property: "island_count",
        default: 100,
        stops: [
          [0, 1],
          [1, 3],
          [2, 8],
        ],
      },
    },
  };
  load_data_and_layer_from_api_url(
    map,
    url,
    layer_insertion_order,
    source_name,
    blue_config
  );
};

const yellow_gaps = (map, layer_insertion_order) => {
  let url = api_url_base() + "/sidewalk/nearby-gaps/?q=60943";
  let source_name = "selected-gap";
  let yellow_config = {
    id: "clicked_gap",
    type: "line",
    source: source_name,
    paint: {
      "line-color": "yellow",
      "line-opacity": 1,
      "line-width": {
        property: "island_count",
        default: 100,
        stops: [
          [0, 3],
          [1, 10],
          [2, 20],
        ],
      },
    },
  };
  load_data_and_layer_from_api_url(
    map,
    url,
    layer_insertion_order,
    source_name,
    yellow_config
  );

  // map.addLayer(yellow_config, layer_insertion_order);
};
const initialGeojsonLoad = (map, firstSymbolId) => {
  /**
   * Load the API's geojson response for the first time
   * This is necessary so that the layer already exists
   * when we go to refresh it during the click event.
   *
   * When the layer is added for the first time, the
   * opacity is set to zero so it does not appear visually.
   * Later on we will set the opacity to a non-zero value when needed.
   */
  load_pois_near_single_gap(map, firstSymbolId);
  load_munis(map, firstSymbolId);
  load_one_muni(map, firstSymbolId);
  load_gaps(map, firstSymbolId);
  yellow_gaps(map, firstSymbolId);

  // load_missing_links(map, firstSymbolId);
};

// GET DATA
// ABOUT A
// SINGLE
// MUNICIPALITY

const fly_to_muni_centroid = (map, muni_name) => {
  let url =
    api_url_base() +
    "/sidewalk/one-muni-centroid/?q=" +
    muni_name.replace(" ", "%20");

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var json = JSON.parse(this.response);

      map.flyTo({
        center: [json[0].x, json[0].y],
        zoom: 13,
        essential: true,
      });
    }
  };
  request.send();
};

const reload_selected_muni = (map, muni_name) => {
  let url =
    api_url_base() + "/sidewalk/one-muni/?q=" + muni_name.replace(" ", "%20");

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("one-muni").setData(json);

      map.setPaintProperty("selected-municipality", "line-opacity", 0.8);
    }
  };
  request.send();
};

// GET GAPS
// WITHIN POI
// WALKSHED AREA

const reload_gaps = (map, url) => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var json = JSON.parse(this.response);

      map.getSource("gap-lines").setData(json);
      map.getSource("selected-gap").setData(json);

      map.setPaintProperty("gaps", "line-opacity", 0.5);
    }
  };
  request.send();
};

const reload_gaps_near_poi = (map, poi_uid) => {
  /**
   * Update the geojson layer from the API response
   * Set the line-opacity to 0.5 after successfully loading the JSON data
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {number} poi_uid - This is the ID value for the specific POI
   */
  let url = api_url_base() + "/sidewalk/nearby-gaps/?q=" + poi_uid;
  reload_gaps(map, url);
};

const reload_gaps_within_muni = (map, muni_name) => {
  /**
   * Update the geojson layer from the API response
   * Set the line-opacity to 0.5 after successfully loading the JSON data
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {number} poi_uid - This is the ID value for the specific POI
   */
  let url =
    api_url_base() +
    "/sidewalk/gaps-within-muni/?q=" +
    muni_name.replace(" ", "%20");

  reload_gaps(map, url);
};

const reload_pois_near_gap = (map, uid) => {
  let url = api_url_base() + "/sidewalk/pois-near-gap/?q=" + uid.toString();

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("selected-pois").setData(json);
      map.setPaintProperty("selected_pois", "circle-stroke-opacity", 1);

      // Prepare and set the text in the info box
      var num_pois = Object.keys(json.features).length;

      let all_categories = [];

      json.features.forEach((feature) => {
        let category = feature.properties.category;
        all_categories.push(category);
      });
      const counts = {};

      for (const category of all_categories) {
        counts[category] = counts[category] ? counts[category] + 1 : 1;
      }
      console.log(counts);

      let text =
        'improve pedestrian connectivity to <span class="green-text" style="font-weight: bold">' +
        num_pois +
        "</span> destinations within one mile: <ul>";

      for (const [category, num_times] of Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )) {
        let nice_category_name = nice_category_name_for_bullets(
          category,
          num_times
        );

        text +=
          "<li>" + num_times.toString() + " " + nice_category_name + "</li>";
      }

      text += "</ul>";

      set_text_to_div(text, "stat-destinations");
    }
  };
  request.send();
};

const reload_pois_near_sw = (map, lngLat) => {
  console.log(lngLat);
  let url =
    api_url_base() +
    "/sidewalk/pois-near-existing-sidewalk/?lng=" +
    lngLat.lng +
    "&lat=" +
    lngLat.lat;

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("selected-pois").setData(json);
      map.setPaintProperty("selected_pois", "circle-stroke-opacity", 1);

      // Prepare and set the text in the info box
      var num_pois = Object.keys(json.features).length;

      let all_categories = [];

      json.features.forEach((feature) => {
        let category = feature.properties.category;
        all_categories.push(category);
      });
      const counts = {};

      for (const category of all_categories) {
        counts[category] = counts[category] ? counts[category] + 1 : 1;
      }
      console.log(counts);

      let text =
        'could provide pedestrian connectivity to <span class="green-text" style="font-weight: bold">' +
        num_pois +
        "</span> destinations within one mile: <ul>";

      for (const [category, num_times] of Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )) {
        let nice_category_name = nice_category_name_for_bullets(
          category,
          num_times
        );

        text +=
          "<li>" + num_times.toString() + " " + nice_category_name + "</li>";
      }

      text += "</ul>";

      set_text_to_div(text, "stat-destinations");
    }
  };
  request.send();
};

export {
  reload_gaps_near_poi,
  initialGeojsonLoad,
  api_url_base,
  fly_to_muni_centroid,
  reload_selected_muni,
  reload_gaps_within_muni,
  reload_pois_near_gap,
  reload_pois_near_sw,
};
