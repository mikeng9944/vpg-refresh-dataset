const express = require("express"); // Adding Express
const app = express(); // Initializing Express
const port = process.env.PORT || 8080;

const puppeteer = require("puppeteer-core");

app.get("/refresh", function (req, res) {
  (async () => {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://app.powerbi.com/groups/ce2aea02-18eb-4751-a383-4bfe0457272b/datasets/0a5183b0-0ffe-4b09-84d2-3bbe6acd5aec/details?experience=power-bi"
    );
    await page.waitForSelector(
      'div[data-test-id="mike.ng@valuepartners-group.com"]'
    );
    await page.click('div[data-test-id="mike.ng@valuepartners-group.com"]');
    await page.waitForSelector('button[title="重新整理"]');
    await page.click('button[title="重新整理"]');
    await page.waitForSelector('button[title="立即更新"]');
    await page.click('button[title="立即更新"]');
    await page.click('button[title="立即更新"]');
    // setTimeout(function () {
    //   browser.close();
    // }, 5000);
    res.send("Finished refresh.");
  })();
});

// Making Express listen on port 8080
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
