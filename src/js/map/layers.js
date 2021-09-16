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
  iso_osm: {
    id: "iso_osm",
    type: "fill",
    source: "mcpcv1-tiles",
    "source-layer": "mcpc_isos",
    paint: {
      "fill-color": "rgba(" + color_codes.osm + ", 0.5)",
      "fill-opacity": 0,
    },
    filter: osm_filter,
  },
  iso_osm_outline: {
    id: "iso_osm_outline",
    type: "line",
    source: "mcpcv1-tiles",
    "source-layer": "mcpc_isos",
    paint: {
      "line-color": "rgba(" + color_codes.osm + ", 0.5)",
      "line-opacity": 0,
      "line-width": 3,
      "line-dasharray": [2, 1.5, 1, 1.5],
    },
    filter: osm_filter,
  },
  iso_sw: {
    id: "iso_sw",
    type: "fill",
    source: "mcpcv1-tiles",
    "source-layer": "mcpc_isos",
    paint: {
      "fill-color": "rgba(" + color_codes.sidewalk + ", 0.5)",
      "fill-opacity": 0,
    },
    filter: sw_filter,
  },
  iso_sw_outline: {
    id: "iso_sw_outline",
    type: "line",
    source: "mcpcv1-tiles",
    "source-layer": "mcpc_isos",
    paint: {
      "line-color": "rgba(" + color_codes.sidewalk + ", 0.5)",
      "line-opacity": 0,
      "line-width": 3,
      "line-dasharray": [2, 1.5, 1, 1.5],
    },
    filter: sw_filter,
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
  clicked_gap: {
    id: "clicked_gap",
    type: "line",
    source: "mcpcv1-tiles",
    "source-layer": "montco_missing_sidewalks",
    paint: {
      "line-color": "yellow",
      "line-opacity": 0,
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
    layout: {
      // make layer visible by default
      visibility: "visible",
    },
  },
  gaps: {
    id: "gaps",
    type: "line",
    source: "mcpcv1-tiles",
    "source-layer": "montco_missing_sidewalks",
    paint: {
      "line-color": "rgb(57,83,164)",
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
    layout: {
      // make layer visible by default
      visibility: "visible",
    },
    filter: ["==", "uid", "-1"],
  },
  selected_poi_entrypoints: {
    id: "selected_poi_entrypoints",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "pois_full",
    layout: {},
    paint: {
      "circle-radius": 4,
      "circle-opacity": 1,
      "circle-stroke-opacity": 1,
      "circle-stroke-width": 1,
      "circle-color": "black",
      "circle-stroke-color": "white",
    },
    filter: ["==", "type", "none - this filter should return zero results"],
  },
  all_pois: {
    id: "all_pois",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "pois_centroids",
    layout: {},
    paint: {
      "circle-radius": 6,
      "circle-opacity": 1,
      "circle-stroke-opacity": 1,
      "circle-stroke-color": "black",
      "circle-stroke-width": 1,
      "circle-color": {
        property: "ab_ratio",
        default: "white",
        stops: [
          [0, "rgba(255, 255, 255, 0.8)"],
          [0.0001, "rgba(255, 0, 0, 1)"],
          [0.1, "rgba(255, 153, 0, 1)"],
          [0.5, "rgba(255, 255, 0, 1)"],
          [1, "rgba(0, 153, 0, 1)"],
        ],
      },
    },
  },
  selected_poi: {
    id: "selected_poi",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "pois_centroids",
    layout: {},
    paint: {
      "circle-radius": 20,
      "circle-opacity": 0,
      "circle-stroke-opacity": 0,
      "circle-stroke-width": 8,
      "circle-stroke-color": "black",
    },
    filter: ["==", "type", "none - this filter should return zero results"],
  },
};

export { map_layers_group_1, map_layers_group_2, sw_filter, osm_filter };
