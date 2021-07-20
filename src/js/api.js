const URL_BASE = "http://localhost:8000";

const initialGeojsonLoad = (map, firstSymbolId) => {
  let url = URL_BASE + "/sidewalk/nearby-gaps/?q=1007";

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
            "line-color": "#000000",
          },
        },
        firstSymbolId
      );
    }
  };
  request.send();
};

const reloadGeojson = (map, eta_uid) => {
  let url = URL_BASE + "/sidewalk/nearby-gaps/?q=" + eta_uid;

  // make a GET request to parse the GeoJSON at the url
  // alert("Inside the reload block");
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

export { reloadGeojson, initialGeojsonLoad };
