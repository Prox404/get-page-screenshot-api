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
  // chromium.args = [...chromium.args, '--hide-scrollbars', '--disable-web-security'];
  // chromium.defaultViewport = chromium.defaultViewport || {width: 1280, height: 800};
  // chromium.executablePath = await chromium.executablePath || await chromium.executablePath;


  let browser = null;
  try {


    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: "new",
      ignoreHTTPSErrors: true,
    });

  } catch (error) {
    console.log(error);
  }

  if (browser) {
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': screenshot.length
    });
    res.end(screenshot);
  }else{
    res.send({
      message: 'Error!'
    });
  }

});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});