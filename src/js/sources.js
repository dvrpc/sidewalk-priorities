const data_sources = {
  "boundary-tiles": {
    type: "vector",
    url: "https://www.tiles.dvrpc.org/data/census_boundaries.json",
  },
  "sidewalk-tiles": {
    type: "vector",
    url: "https://www.tiles.dvrpc.org/data/pedestrian-network.json",
  },
  "mcpcv1-tiles": {
    type: "vector",
    url: "http://localhost:8081/data/mcpc_v1.json",
  },
};
export { data_sources };
