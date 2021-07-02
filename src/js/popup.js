const newPopup = () =>
  new mapboxgl.Popup({
    closebutton: false,
    className: "i-am-a-popup",
  });

const bindPopup = (map, html_msg, click) => {
  var popup = newPopup();
  popup.setLngLat(click.lngLat).setHTML(html_msg).addTo(map);
};

// const poi_message

const poi_message = (e) => {
  var props = e.features[0].properties;

  var titleCasedName = props.name
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ");

  var ratio = props.ab_ratio * 100;
  if (ratio > 100) {
    ratio = 100;
  }
  if (ratio == 100) {
    var ratio = "100%";
  } else if (ratio == 0) {
    var ratio = "No";
  } else {
    var ratio = String(ratio.toFixed(1)) + "%";
  }
  return (
    "<h1>" + titleCasedName + "</h1><h3>" + ratio + " sidewalk coverage</h3>"
  );
};

export { bindPopup, poi_message };
