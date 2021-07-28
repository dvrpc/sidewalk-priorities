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
  let url = api_url_base() + "/sidewalk/nearby-gaps/?q=1007";

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("missing-links", {
        type: "geojson",
        data: json,
      });
      map.addLayer(
        {
          id: "missing-links-for-selected-poi",
          type: "line",
          source: "missing-links",
          paint: {
            "line-width": 4,
            "line-opacity": 0,
            "line-color": "yellow",
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();
};

const reloadGeojson = (map, eta_uid) => {
  /**
   * Update the geojson layer from the API response
   * Set the line-opacity to 0.5 after successfully loading the JSON data
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {number} eta_uid - This is the ID value for the specific POI
   */
  let url = api_url_base() + "/sidewalk/nearby-gaps/?q=" + eta_uid;

  // make a GET request to parse the GeoJSON at the url
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.getSource("missing-links").setData(json);

      map.setPaintProperty(
        "missing-links-for-selected-poi",
        "line-opacity",
        0.5
      );
    }
  };
  request.send();
};

export { reloadGeojson, initialGeojsonLoad, api_url_base };
