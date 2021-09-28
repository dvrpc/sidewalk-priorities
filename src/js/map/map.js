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

export { makeMap };
