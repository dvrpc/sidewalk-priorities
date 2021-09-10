// import { clearPopups } from "./popup.js";
import { reloadGeojson, api_url_base } from "./api.js";

const wire_dropdown_behavior = (map) => {
  /**
   * Set up the behavior for the dropdown selector
   *
   * Steps:
   *    - User changes selected POI type
   *    - Page subtitle gets updated
   *    - POI layer is filtered to the selected type
   *    - Isochrones, missing link layers, and POI info box are hidden
   *    - Popups are removed (if present)
   *    - Map is zoomed back out to the county extent
   */

  var dropdown = document.getElementById("dropdown_muni");
  var subtitle = document.getElementById("subtitle");

  dropdown.addEventListener("change", function () {
    var muni_name = dropdown.value;

    subtitle.innerHTML = muni_name;

    reloadGeojson(map, muni_name);

    var infoBox = document.getElementById("stat-box");
    infoBox.style.setProperty("visibility", "hidden");

    let url =
      api_url_base() +
      "/sidewalk/one-muni-centroid/?q=" +
      muni_name.replace(" ", "%20");

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // retrieve the JSON from the response
        var json = JSON.parse(this.response);

        console.log(json);

        map.flyTo({
          center: [json[0].x, json[0].y],
          zoom: 13,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    };
    request.send();
  });
};

export { wire_dropdown_behavior };
