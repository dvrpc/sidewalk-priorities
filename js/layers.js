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
};

export { map_layers };
