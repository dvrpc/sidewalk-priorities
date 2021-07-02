const paint_props = {
  sidewalks: {
    id: "sw",
    attribute: "line-width",
    style: ["interpolate", ["exponential", 0.5], ["zoom"], 10, 0.1, 17, 5],
  },
  crosswalks: {
    id: "xwalk",
    attribute: "line-width",
    style: ["interpolate", ["exponential", 0.5], ["zoom"], 10, 0.5, 18, 12],
  },
  all_pois: {
    id: "all_pois",
    attribute: "circle-radius",
    style: ["interpolate", ["linear"], ["zoom"], 10, 5, 18, 20],
  },
  selected_poi: {
    id: "selected_poi",
    attribute: "circle-radius",
    style: ["interpolate", ["linear"], ["zoom"], 10, 5, 18, 20],
  },
};

export { paint_props };
