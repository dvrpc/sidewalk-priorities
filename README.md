# sidewalk-priorities

Web app that dynamically visualizes sidewalk improvement priorities, using Montgomery County as a case study

## Vector Tiles

This map relies upon a few different vector data sources. Some of these
already exist on DVRPC's tile server, including `pedestrian-network` and `census_boundaries`.

A new tileset is also required, which currently is being hosted locally during development. To run the tileset, set an env var to the folder where the tileset
is stored, and run the `docker` command after `cd`'ing into the folder.

```bash
export TILE_DIR="/Volumes/GoogleDrive/My Drive/projects/SIDEWALKS/TILES/mcpc/tileset"

cd $TILE_DIR && docker run --rm -it -v "$(pwd):/data" -p 8081:80 maptiler/tileserver-gl
```
