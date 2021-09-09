mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFyb25kdnJwYyIsImEiOiJja2NvN2s5dnAwaWR2MnptbzFwYmd2czVvIn0.Fcc34gzGME_zHR5q4RnSOg";

const makeMap = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/aarondvrpc/ckqhcmx6x95x318pgqzt4jicq",
    center: [-75.36277290123333, 40.201296611075346],
    zoom: 10,
  });
};

export { makeMap };
