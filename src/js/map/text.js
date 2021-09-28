const title_cased_text = (badly_formatted_text) => {
  /**
   * Camel case the input text.
   * e.g.: convert 'ALL CAPS' into 'All Caps'
   *
   * @param {string} badly_formatted_text - Input text
   * @return {string}
   */
  try {
    var txt = badly_formatted_text
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
  } catch {
    var txt = badly_formatted_text;
  }
  return txt;
};

const convert_ratio_to_text = (ratio_as_float) => {
  /**
   * Convert a ratio (0 to 1) into an appropriate text value
   * Steps:
   *  - multiply ratio by 100
   *  - round values over 100 down to 100
   *  - return a rounded number with percent sign, or "no" if the ratio is zero
   *
   * @param {number} ratio_as_float - a float value between zero and one
   * @return {string} - something like '95.4%' or 'No'
   */
  var ratio_multiplied = ratio_as_float * 100;

  if (ratio_multiplied > 100) {
    ratio_multiplied = 100;
  }
  if (ratio_multiplied == 100) {
    var ratio_text = "100%";
  } else if (ratio_multiplied == 0) {
    var ratio_text = "No";
  } else if (ratio_multiplied < 0) {
    var ratio_text = "Only";
  } else {
    var ratio_text = String(ratio_multiplied.toFixed(1)) + "%";
  }

  return ratio_text;
};

const pois_as_singular_item = {
  "Public School": "Public School",
  "Private School": "Private School",
  "School - College, University": "College/University",
  "Health Facility": "Health Care Facility",
  "Food Store": "Food Store",
  "Activity Center for Seniors or Disabled":
    "Activity Center for Senior/Disabled",
  "Municipal Buildings": "Municipal Building",
  Libraries: "Library",
  "Shopping Centers": "Shopping Center",
  Parks: "Park",
  "SEPTA regional rail": "SEPTA Regional Rail stop",
  "SEPTA norristown high speed line": "SEPTA Norristown High Speed Line stop",
  "SEPTA bus": "SEPTA Bus stop",
};

const pois_as_many_items = {
  "Public School": "Public Schools",
  "Private School": "Private Schools",
  "School - College, University": "Colleges/Universities",
  "Health Facility": "Health Care Facilities",
  "Food Store": "Food Stores",
  "Activity Center for Seniors or Disabled":
    "Activity Centers for Senior/Disabled",
  "Municipal Buildings": "Municipal Buildings",
  Libraries: "Libraries",
  "Shopping Centers": "Shopping Centers",
  Parks: "Parks",
  "SEPTA regional rail": "SEPTA Regional Rail stops",
  "SEPTA norristown high speed line": "SEPTA Norristown High Speed Line stops",
  "SEPTA bus": "SEPTA Bus stops",
};

const nice_category_name_for_bullets = (original_text, count_of_occurances) => {
  let text = "";
  if (count_of_occurances == 1) {
    text = pois_as_singular_item[original_text];
  } else {
    text = pois_as_many_items[original_text];
  }
  return text;
};

export {
  title_cased_text,
  convert_ratio_to_text,
  nice_category_name_for_bullets,
  pois_as_singular_item,
  pois_as_many_items,
};
