const get_query_params = () => {
  let searchParams = new URLSearchParams(window.location);
  let query = searchParams.get("search");
  if (query == "") {
    return null;
  } else {
    let result = {};

    query.split("&").forEach((param) => {
      param = param.replace("?", "");
      let parts = param.split("=");
      result[parts[0]] = parts[1];
    });
    return result;
  }
};

export { get_query_params };
