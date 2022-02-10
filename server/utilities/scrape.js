import puppeteer from 'puppeteer';
const amazonUrl = 'https://www.amazon.com';
const flipkartUrl = 'https://www.flipkart.com';
const alibabaUrl = 'https://www.alibaba.com/trade/search?SearchText=';

const waitUntil = 'domcontentloaded';
const getFlipkartVendors = async (browser, productName) => {
  const page = await browser.newPage();
  await page.goto(`${flipkartUrl}/search?q=${productName}`, { waitUntil });
  await page.waitForSelector('body');
  const productList = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('a._1fQZEK');
    items.forEach((item, index) => {
      if (index < 3) {
        results.push({
          url: item.getAttribute('href'),
          text: item.innerText
        });
      }
    });
    return results;
  });
  const productDetails = [];
  // first product
  const page1 = await browser.newPage();
  await page1.goto(flipkartUrl + productList[0]?.url, { waitUntil });
  await page1.waitForSelector('body');
  const productDetails1 = await getProductDetailsFromFlipkart(page1);
  // second product
  const page2 = await browser.newPage();
  await page2.goto(flipkartUrl + productList[1]?.url, { waitUntil });
  await page2.waitForSelector('body');
  const productDetails2 = await getProductDetailsFromFlipkart(page2);
  // third product
  const page3 = await browser.newPage();
  await page3.goto(flipkartUrl + productList[2]?.url, { waitUntil });
  await page3.waitForSelector('body');
  const productDetails3 = await getProductDetailsFromFlipkart(page3);
  return [...productDetails, productDetails1, productDetails2, productDetails3];
};
const getAmazonVendors = async (browser, productName) => {
  const page = await browser.newPage();
  await page.goto(`${amazonUrl}/s?k=${productName}`, { waitUntil });
  await page.waitForSelector('body');
  const productList = await page.evaluate(() => {
    const results = [];
    const images = document.querySelectorAll('img.s-image');
    const items = document.querySelectorAll('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal');
    items.forEach((item, index) => { if (index < 3) results.push({ url: item.getAttribute('href'), imageUrl: images[index]?.getAttribute('src') }); });

    return results;
  });
  const productDetails = [];
  // first product
  const page1 = await browser.newPage();
  await page1.goto(amazonUrl + productList[0]?.url, { waitUntil });
  // await page1.waitForSelector('body');
  const productDetails1 = await getProductDetailsFromAmazon(page1);
  // second product
  const page2 = await browser.newPage();
  await page2.goto(amazonUrl + productList[1]?.url, { waitUntil });
  // await page2.waitForSelector('body');
  const productDetails2 = await getProductDetailsFromAmazon(page2);
  // third product
  const page3 = await browser.newPage();
  await page3.goto(amazonUrl + productList[2]?.url, { waitUntil });
  // await page3.waitForSelector('body');
  const productDetails3 = await getProductDetailsFromAmazon(page3);
  return [...productDetails, { ...productDetails1, imageUrl: productList[0]?.imageUrl }, { ...productDetails2, imageUrl: productList[1]?.imageUrl }, { ...productDetails3, imageUrl: productList[2]?.imageUrl }];
};
const getProductDetailsFromAmazon = async (page) => {
  const productDetails = await page.evaluate(() => {
    let results = {};
    const productName = document.querySelector('#productTitle');
    const productRating = document.querySelector('span.a-icon-alt');
    const productPrice = document.querySelector('span.a-offscreen');

    results = {
      name: productName.innerHTML.trim(),
      rating: productRating.innerHTML.substring(0, 3),
      price: productPrice.innerHTML
    };
    return results;
  });
  return productDetails;
};
const getAlibabaVendors = async (productName) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(alibabaUrl + productName, { waitUntil });
  await page.waitForSelector('body');
  return 'alibaba';
};

const getProductDetailsFromFlipkart = async (page) => {
  const productDetails = await page.evaluate(() => {
    let results = {};
    const productImage = document.querySelector('img._396cs4');
    const productName = document.querySelector('span.B_NuCI');
    const productRating = document.querySelector('div._3LWZlK');
    const productPrice = document.querySelector('div._30jeq3._16Jk6d');

    results = {
      imageUrl: productImage.getAttribute('srcset'),
      name: productName.innerHTML,
      rating: productRating.innerHTML.substring(0, 3),
      price: productPrice.innerHTML
    };
    return results;
  });
  return productDetails;
};

const searchVendors = async (req, res, next) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const { productName } = req.query;
    const flipKartProducts = await getFlipkartVendors(browser, productName);
    const amazonProducts = await getAmazonVendors(browser, productName);
    res.send({ amazonVendors: amazonProducts, flipkartVendors: flipKartProducts });
  } catch (error) {
    next(error);
  } finally {
    await browser.close();
  }
};
export { searchVendors };
