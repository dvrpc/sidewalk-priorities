import { api_url_base } from "./api.js";
import { color_codes } from "./colors.js";

const makeGraph = () => {
  const chart_ctx = document.getElementById("barChart");
  const data = {
    labels: [""],
    datasets: [
      {
        label: "Using existing sidewalks",
        backgroundColor: "rgba(" + color_codes.sidewalk + ", 0.5)",
        borderColor: "rgba(" + color_codes.sidewalk + ", 0.5)",
        data: [50],
      },
      {
        label: "If every road had sidewalks",
        backgroundColor: "rgba(" + color_codes.osm + ", 0.5)",
        borderColor: "rgba(" + color_codes.osm + ", 0.5)",
        data: [100],
      },
    ],
  };
  const config = {
    type: "bar",
    data,
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "square miles",
            padding: {
              bottom: 10,
            },
          },
        },
      },
    },
  };
  return new Chart(chart_ctx, config);
};

const update_graph_with_api_data = (graph, uid) => {
  // make a GET request to parse the GeoJSON at the url
  // alert("Inside the reload block");
  var url = api_url_base() + "/walkshed-area/?q=" + uid;
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var data_from_api = JSON.parse(this.response);

      graph.data.datasets[0].data = [
        data_from_api.pedestriannetwork_lines.area_in_square_miles,
      ];
      graph.data.datasets[1].data = [
        data_from_api.osm_edges_all_no_motorway.area_in_square_miles,
      ];

      graph.update();
    }
  };
  request.send();
};

export { update_graph_with_api_data, makeGraph };
