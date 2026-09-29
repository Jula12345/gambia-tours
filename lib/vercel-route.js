const { handleApi } = require("../server");

function route(pathname) {
  return async function vercelHandler(request, response) {
    const url = new URL(pathname, `https://${request.headers.host || "gambiantour.com"}`);
    return handleApi(request, response, url);
  };
}

module.exports = route;
