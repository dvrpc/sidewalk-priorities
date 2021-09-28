mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const makeMap = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dvrpcomad/cks6e6uk5dawe18rzxek2oyjf",
    center: [-75.36277290123333, 40.201296611075346],
    zoom: 10,
  });
};

const find_first_symbol_id = (map) => {
  const layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  let firstSymbolId;
  for (const layer of layers) {
    if (layer === "symbol") {
      firstSymbolId = layer.id;
      break;
    }
  }

  return firstSymbolId;
};

export { makeMap, find_first_symbol_id };
