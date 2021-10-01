# sidewalk-priorities

Web app that dynamically visualizes sidewalk improvement priorities, using Montgomery County as a case study.

This application can be found at [https://dvrpc.org/webmaps/sidewalk-priorities](https://dvrpc.org/webmaps/sidewalk-priorities)

## Development

`npm` and `webpack` are used to manage dependencies, run the development server, and bundle the final product.

- Install locally: `npm install`
- Run local development server: `npm run dev` (uses [`webpack.dev.js`](./webpack.dev.js))
- Create output bundle: `npm run build` (uses [`webpack.prod.js`](./webpack.prod.js))

## Backend

An API was created to translate requests from the front end into JSON responses from a backend PostgreSQL database. This repo can be found at https://github.com/dvrpc/sidewalk-priorities-api
