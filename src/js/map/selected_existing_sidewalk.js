const starter_data = {
  type: "LineString",
  coordinates: [
    [-75.24747490882874, 40.00070356410586],
    [-75.24741053581238, 40.00072000146503],
    [-75.24736225605011, 40.00075287617142],
  ],
};

const add_selected_sidewalk_layer_to_map = (map) => {
  map.addSource("selected_existing_sidewalk_data", {
    type: "geojson",
    data: starter_data,
  });

  map.addLayer({
    id: "selected_existing_sidewalk",
    type: "line",
    source: "selected_existing_sidewalk_data",
    paint: {
      "line-color": "yellow",
      "line-width": 4,
      "line-opacity": 0,
    },
  });
};

export { add_selected_sidewalk_layer_to_map };
