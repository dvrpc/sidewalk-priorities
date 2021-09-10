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
    var url = "http://localhost:8000";
  } else {
    var url = "https://omad-api-lf2k9.ondigitalocean.app";
  }
  return url;
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
  let url_for_all_munis = api_url_base() + "/sidewalk/all-munis";
  let url_for_one_muni =
    api_url_base() + "/sidewalk/one-muni/?q=Abington%20Township";
  let url_for_one_muni_gaps =
    api_url_base() + "/sidewalk/gaps-within-muni/?q=Abington%20Township";

  let url_for_pois_near_one_gap =
    api_url_base() + "/sidewalk/pois-near-gap/?q=60943";

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url_for_all_munis, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("all-munis", {
        type: "geojson",
        data: json,
      });
      // Add all munis
      map.addLayer(
        {
          id: "all-municipalities",
          type: "line",
          source: "all-munis",
          paint: {
            "line-color": "black",
            "line-opacity": 0.5,
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url_for_one_muni, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("one-muni", {
        type: "geojson",
        data: json,
      });
      // Add a layer for the selected muni
      map.addLayer(
        {
          id: "selected-municipality",
          type: "line",
          source: "one-muni",
          paint: {
            "line-color": "red",
            "line-opacity": 0,
            "line-width": 10,
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url_for_one_muni_gaps, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("gaps", {
        type: "geojson",
        data: json,
      });

      map.addLayer(
        {
          id: "clicked-gap",
          type: "line",
          source: "gaps",
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
          filter: ["in", "uid", "-1"],
        },
        firstSymbolId
      );

      map.addLayer(
        {
          id: "gap-layer",
          type: "line",
          source: "gaps",
          paint: {
            "line-color": "blue",
            "line-opacity": 0,
            "line-width": {
              property: "island_count",
              default: 100,
              stops: [
                [0, 1],
                [1, 5],
                [2, 10],
              ],
            },
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url_for_pois_near_one_gap, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("selected_poi_data", {
        type: "geojson",
        data: json,
      });

      map.addLayer(
        {
          id: "selected_pois",
          type: "circle",
          source: "selected_poi_data",
          paint: {
            "circle-radius": 6,
            "circle-opacity": 0,
            "circle-stroke-opacity": 1,
            "circle-stroke-color": "black",
            "circle-stroke-width": 1,
            "circle-color": {
              property: "ab_ratio",
              default: "black",
              stops: [
                [0, "rgba(0, 0, 0, 1)"],
                [0.0001, "rgba(255, 0, 0, 1)"],
                [0.1, "rgba(255, 153, 0, 1)"],
                [0.5, "rgba(255, 255, 0, 1)"],
                // [0.75, "rgba(0, 153, 0, 1)"],
                [1, "rgba(0, 153, 0, 1)"],
                // [0.0001, "rgba(255, 0, 0, 1)"],
                // [0.7, "rgba(255, 255, 0, 1)"],
                // [1, "rgba(0, 153, 0, 1)"],
                // [2, "rgba(0, 153, 0, 1)"], # old stop values, if needed
              ],
            },
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();
};

const reloadGeojson = (map, muni_name) => {
  /**
   * Update the geojson layer from the API response
   * Set the line-opacity to 0.5 after successfully loading the JSON data
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} muni_name - The name of the municipality to show
   */
  let url =
    api_url_base() + "/sidewalk/one-muni/?q=" + muni_name.replace(" ", "%20");

  let gap_url =
    api_url_base() +
    "/sidewalk/gaps-within-muni/?q=" +
    muni_name.replace(" ", "%20");

  console.log(url);

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("one-muni").setData(json);

      map.setPaintProperty("selected-municipality", "line-opacity", 0.5);
    }
  };
  request.send();

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", gap_url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("gaps").setData(json);

      map.setPaintProperty("gap-layer", "line-opacity", 0.5);
    }
  };
  request.send();
};

export { reloadGeojson, initialGeojsonLoad, api_url_base };
