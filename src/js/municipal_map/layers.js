import { color_codes } from "./colors.js";

var sw_filter = ["all", ["==", "src_network", "pedestriannetwork_lines"]];
var osm_filter = ["all", ["==", "src_network", "osm_edges_all_no_motorway"]];

const map_layers_group_1 = {
  /**
   * This defines the layers that appear UNDERNEATH the API's missing links layer
   *
   * Each entry has properties that are accepted by the map.addLayer() function
   */
  montco: {
    id: "montco",
    type: "line",
    source: "boundary-tiles",
    "source-layer": "county",
    layout: {},
    paint: {
      "line-width": 10,
      "line-opacity": 0.4,
      "line-color": "black",
    },
    filter: ["==", "CNTY_NAME", "Montgomery County"],
  },
};

const map_layers_group_2 = {
  /**
   * This defines the layers that appear ABOVE the API's missing links layer
   *
   * Each entry has properties that are accepted by the map.addLayer() function
   */

  sw: {
    id: "sw",
    type: "line",
    source: "sidewalk-tiles",
    "source-layer": "ped_lines",
    paint: {
      "line-width": 4,
      "line-opacity": 0.2,
      "line-color": "black",
    },
    layout: {
      // make layer visible by default
      visibility: "visible",
    },
    filter: ["all", ["==", "line_type", 1], ["==", "county", "MONTGOMERY"]],
  },
  xwalk: {
    id: "xwalk",
    type: "line",
    source: "sidewalk-tiles",
    "source-layer": "ped_lines",
    paint: {
      "line-width": 9,
      "line-opacity": 0.2,
      "line-color": "black",
    },
    layout: {
      // make layer visible by default
      visibility: "visible",
    },
    filter: ["all", ["==", "line_type", 2], ["==", "county", "MONTGOMERY"]],
  },
  all_pois: {
    id: "all_pois",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "pois_centroids",
    layout: {},
    paint: {
      "circle-radius": 6,
      "circle-opacity": 0.6,
      "circle-stroke-opacity": 0.6,
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
    filter: ["==", "category", "This should not return any features"],
  },
};

export { map_layers_group_1, map_layers_group_2, sw_filter, osm_filter };
