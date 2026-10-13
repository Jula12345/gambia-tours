const { handleApi } = require("../server");

function route(pathname) {
  return async function vercelHandler(request, response) {
    const url = new URL(request.url || pathname, `https://${request.headers.host || "gambiantour.com"}`);
    url.pathname = pathname;
    try {
      return await handleApi(request, response, url);
    } catch (error) {
      console.error(error.message);
      response.writeHead(error.status || 500, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      response.end(JSON.stringify({ error: error.status ? error.message : "The request could not be completed. Please try again." }));
    }
  };
}

module.exports = route;
