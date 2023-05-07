const express = require('express');
const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');
const app = express();

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': screenshot.length
    });
    res.end(screenshot);
  });

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});