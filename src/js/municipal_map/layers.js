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
  all_pois: {
    id: "all_pois",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "pois_centroids",
    layout: {},
    paint: {
      "circle-radius": 3,
      "circle-opacity": 0.6,
      "circle-stroke-opacity": 0.6,
      "circle-stroke-color": "white",
      "circle-stroke-width": 1,
      "circle-color": "black",
    },
  },
};

export { map_layers_group_1, map_layers_group_2, sw_filter, osm_filter };
