const wire_single_layer = (map, layername) => {
  // change mouse tip to pointer finger
  map.on(
    "mouseenter",
    layername,
    () => (map.getCanvas().style.cursor = "pointer")
  );

  // change mouse tip upon leaving feature
  map.on("mouseleave", layername, function (e) {
    map.getCanvas().style.cursor = "";
  });
};

const wire_mouse_hover = (map) => {
  var layers = ["all_pois"];

  layers.forEach((lyr) => wire_single_layer(map, lyr));
};

export { wire_mouse_hover };
