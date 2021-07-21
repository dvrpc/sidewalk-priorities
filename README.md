# sidewalk-priorities

Web app that dynamically visualizes sidewalk improvement priorities, using Montgomery County as a case study

## Development

`npm` and `webpack` are used to manage dependencies, run the development server, and bundle the final product.

- Install locally: `npm install`
- Run local development server: `npm run start` (uses [`webpack.dev.js`](./webpack.dev.js))
- Create output bundle: `npm run build` (uses [`webpack.prod.js`](./webpack.prod.js))

### Vector Tiles

A new tileset is required for this map.

If you want to use a local tileset, use `docker` to spin up a local tileserver to host the data.

```bash
export TILE_DIR="/Volumes/GoogleDrive/My Drive/projects/SIDEWALKS/TILES/mcpc/tileset"

cd $TILE_DIR && docker run --rm -it -v "$(pwd):/data" -p 8081:80 maptiler/tileserver-gl
```

Within `./src/js/sources.js`, set the tileset data url to `"http://localhost:8081/data/your_tileset_name.json"`
