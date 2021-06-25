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
      "fill-color": "rgba(192, 192, 192, 0.5)",
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
      "fill-color": "rgba(0, 255, 0, 0.5)",
      "fill-opacity": 0,
    },
    filter: sw_filter,
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
      "circle-stroke-width": 10,
      "circle-stroke-color": "yellow",
    },
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
          [0, "rgba(255, 0, 0, 1)"],
          [0.7, "rgba(255, 255, 0, 1)"],
          [1, "rgba(0, 153, 0, 1)"],
          [2, "rgba(0, 153, 0, 1)"],
        ],
      },
    },
  },
};

export { map_layers, sw_filter, osm_filter };
