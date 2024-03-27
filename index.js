const express = require("express"); // Adding Express
const app = express(); // Initializing Express
app.use(express.json());
const port = process.env.PORT || 8080;

const puppeteer = require("puppeteer");

app.post("/refresh", function (req, res) {
  const { dataset_url } = req.body;

  (async () => {
    try {
      const browser = await puppeteer.connect({
        browserURL: "http://127.0.0.1:9222",
      });
      const page = await browser.newPage();

      await page.goto(dataset_url);
      // await page.waitForSelector(
      //   'div[data-test-id="mike.ng@valuepartners-group.com"]'
      // );
      // await page.click('div[data-test-id="mike.ng@valuepartners-group.com"]');
      await page.waitForSelector('button[title="Refresh"]');
      await page.click('button[title="Refresh"]');
      await page.waitForSelector('button[title="Refresh now"]', {
        visible: true,
      });
      await page.click('button[title="Refresh now"]');
      await page.click('button[title="Refresh now"]');
      await page.click('button[title="Refresh now"]');
      await page.click('button[title="Refresh now"]');

      const pages = await browser.pages();

      setTimeout(function () {
        for (let i = 1; i < pages.length; i++) {
          pages[i].close();
        }
      }, 5000);
      res.send("Finished refresh.");
    } catch (error) {
      const pages = await browser.pages();

      setTimeout(function () {
        for (let i = 1; i < pages.length; i++) {
          pages[i].close();
        }
      }, 5000);
      res.send("Finished refresh.");
    }
  })();
});

// Making Express listen on port 8080
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
