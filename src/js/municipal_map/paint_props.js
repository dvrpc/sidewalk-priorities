const paint_props = {
  /**
   * This is where scale-driven paint properties are defined.
   *
   * Each entry requires the layer id, attribute name, and style expression.
   */
  sidewalks: {
    id: "sw",
    attribute: "line-width",
    style: ["interpolate", ["exponential", 0.5], ["zoom"], 10, 0.01, 17, 3],
  },
  crosswalks: {
    id: "xwalk",
    attribute: "line-width",
    style: ["interpolate", ["exponential", 0.5], ["zoom"], 10, 0.05, 18, 6],
  },
  // all_pois: {
  //   id: "all_pois",
  //   attribute: "circle-radius",
  //   style: ["interpolate", ["linear"], ["zoom"], 10, 4, 18, 8],
  // },
  // selected_poi: {
  //   id: "selected_poi",
  //   attribute: "circle-radius",
  //   style: ["interpolate", ["linear"], ["zoom"], 10, 5, 18, 20],
  // },
};

export { paint_props };
