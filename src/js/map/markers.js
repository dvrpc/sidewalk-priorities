// MARKERS FROM CLICKING GAP or SW
// -------------------------------

const MAP_MARKERS = []; // global to keep track of markers added to the map

const remove_markers = (marker_list = MAP_MARKERS) => {
  /* Remove any markers that may exist */
  marker_list.forEach((marker) => marker.remove());
};

const add_marker_to_map = (map, lngLat, marker_list = MAP_MARKERS) => {
  /* Add marker at lngLat to map,
   * after first making sure that no other markers exist
   */

  remove_markers();

  let marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
  marker_list.push(marker);

  return marker;
};

export { add_marker_to_map, remove_markers };
