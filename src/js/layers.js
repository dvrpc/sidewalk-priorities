var sw_filter = ["all", ["==", "src_network", "pedestriannetwork_lines"]];
var osm_filter = ["all", ["==", "src_network", "osm_edges_all"]];

const map_layers = {
  // Show existing bike facilities with thin transparent green line
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
    "source-layer": "eta_isos",
    paint: {
      "fill-color": "black",
      "fill-opacity": 0,
    },
    filter: osm_filter,
  },
  iso_sw: {
    id: "iso_sw",
    type: "fill",
    source: "mcpcv1-tiles",
    "source-layer": "eta_isos",
    paint: {
      "fill-color": "purple",
      "fill-opacity": 0,
    },
    filter: sw_filter,
  },
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
    "source-layer": "eta_points",
    layout: {},
    paint: {
      "circle-radius": 6,
      "circle-opacity": 0.6,
      "circle-stroke-opacity": 1,
      "circle-stroke-color": "black",
      "circle-stroke-width": 1.5,
      "circle-color": {
        property: "ab_ratio",
        default: "black",
        stops: [
          [-1, "rgba(255, 255, 255, 1)"],
          [0, "rgba(255, 0, 0, 1)"],
          [0.7, "rgba(255, 255, 0, 1)"],
          [1, "rgba(0, 153, 0, 1)"],
          [2, "rgba(0, 153, 0, 1)"],
        ],
      },
    },
  },
  selected_poi: {
    id: "selected_poi",
    type: "circle",
    source: "mcpcv1-tiles",
    "source-layer": "eta_points",
    layout: {},
    paint: {
      "circle-radius": 20,
      "circle-opacity": 0,
      "circle-stroke-opacity": 0,
      "circle-stroke-width": 8,
      "circle-stroke-color": "black",
    },
  },
};

export { map_layers, sw_filter, osm_filter };
