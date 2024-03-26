const puppeteer = require("puppeteer");
const request_client = require("request-promise-native");

(async () => {
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9222",
  });
  const page = await browser.newPage();

  const result = [];

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    request_client({
      uri: request.url(),
      resolveWithFullResponse: true,
    }).then((response) => {
      const request_url = request.url();
      const request_headers = request.headers();
      const request_post_data = request.postData();
      const response_headers = response.headers;
      const response_size = response_headers["content-length"];
      const response_body = response.body;

      result.push({
        request_url,
        request_headers,
        request_post_data,
        response_headers,
        response_size,
        response_body,
      });

      request.continue();
    });
  });

  await page.goto(
    "https://app.powerbi.com/groups/ce2aea02-18eb-4751-a383-4bfe0457272b/datasets/0a5183b0-0ffe-4b09-84d2-3bbe6acd5aec/details?experience=power-bi"
  ); // Replace with your desired URL
  console.log(result); // Access the captured data
  await page.close();
})();
