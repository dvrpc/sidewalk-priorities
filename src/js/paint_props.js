const paint_props = {
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