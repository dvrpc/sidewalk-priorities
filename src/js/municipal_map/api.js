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
};

export { reloadGeojson, initialGeojsonLoad, api_url_base };
