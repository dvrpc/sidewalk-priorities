const data_sources = {
  /**
   * URL configurations for all tilesets used in this map
   */
  "boundary-tiles": {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/census_boundaries.json",
  },
  "sidewalk-tiles": {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/pedestrian-network.json",
  },
  "mcpcv1-tiles": {
    type: "vector",
    // url: "http://localhost:8081/data/mcpc_v1.json",
    url: "https://tiles.dvrpc.org/data/sidewalk-prioritiesv3.json",
  },
};
export { data_sources };
