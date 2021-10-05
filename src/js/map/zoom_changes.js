import { ZOOM_THRESHOLD_FOR_LINE_INTERACTION } from "./hover.js";

import { show_element_inline, hide_element } from "./switches.js";

const watch_zoom_level = (map) => {
  map.on("zoomend", () => {
    if (map.getZoom() > ZOOM_THRESHOLD_FOR_LINE_INTERACTION) {
      show_element_inline("text-about-gap-click");
      hide_element("text-about-zooming-in");
    } else {
      hide_element("text-about-gap-click");
      show_element_inline("text-about-zooming-in");
    }
  });
};

export { watch_zoom_level };
