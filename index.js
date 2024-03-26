const express = require("express"); // Adding Express
const app = express(); // Initializing Express
const port = process.env.PORT || 8080;

const puppeteer = require("puppeteer");

app.get("/refresh", function (req, res) {
  (async () => {
    const browser = await puppeteer.connect({
      browserURL: "http://127.0.0.1:9222",
    });
    const page = await browser.newPage();

    await page.goto(
      "https://app.powerbi.com/groups/ce2aea02-18eb-4751-a383-4bfe0457272b/datasets/0a5183b0-0ffe-4b09-84d2-3bbe6acd5aec/details?experience=power-bi"
    );
    // await page.waitForSelector(
    //   'div[data-test-id="mike.ng@valuepartners-group.com"]'
    // );
    // await page.click('div[data-test-id="mike.ng@valuepartners-group.com"]');
    await page.waitForSelector('button[title="Refresh"]');
    await page.click('button[title="Refresh"]');

    await page.waitForSelector('button[title="Refresh now"]');
    await page.click('button[title="Refresh now"]');
    await page.click('button[title="Refresh now"]');
    await page.click('button[title="Refresh now"]');
    await page.click('button[title="Refresh now"]');

    setTimeout(function () {
      page.close();
    }, 5000);
    res.send("Finished refresh.");
  })();
});

// Making Express listen on port 8080
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
