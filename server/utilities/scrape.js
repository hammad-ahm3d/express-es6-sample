import puppeteer from 'puppeteer';
const amazonUrl = 'https://www.amazon.com';
const flipkartUrl = 'https://www.flipkart.com';
const ebayUrl = 'https://www.ebay.com';
const waitUntil = 'domcontentloaded';

const getFlipkartVendors = async (browser, productName) => {
  const page = await browser.newPage();
  await page.goto(`${flipkartUrl}/search?q=${productName}`, { waitUntil });
  const productList = await page.evaluate(() => {
    const results = [];
    const images = document.querySelectorAll('._13oc-S img._396cs4._3exPp9');
    const ratings = document.querySelectorAll('._13oc-S div._3LWZlK');
    const prices = document.querySelectorAll('._13oc-S ._30jeq3._1_WHN1');

    images.forEach((item, index) => {
      if (index < 3) {
        results.push({
          name: item.getAttribute('alt'),
          imageUrl: item.getAttribute('src'),
          rating: ratings[index]?.innerHTML.trim().substring(0, 3),
          price: prices[index]?.innerHTML ?? 'price not available'
        });
      }
    });
    return results;
  });
  return productList;
};
const getAmazonVendors = async (browser, productName) => {
  const page = await browser.newPage();
  await page.goto(`${amazonUrl}/s?k=${productName}`, { waitUntil });
  const productList = await page.evaluate(() => {
    const results = [];
    const images = document.querySelectorAll('img.s-image');
    const ratings = document.querySelectorAll('.a-section .a-row.a-size-small .a-icon-alt');
    const prices = document.querySelectorAll('.a-section .a-price .a-offscreen');

    images.forEach((item, index) => {
      if (index < 3) {
        results.push({
          name: item.getAttribute('alt'),
          imageUrl: item.getAttribute('src'),
          rating: ratings[index]?.innerHTML.trim().substring(0, 3),
          price: prices[index]?.innerHTML ?? 'price not available'
        });
      }
    });
    return results;
  });

  return productList;
};

const getEbayVendors = async (browser, productName) => {
  const page = await browser.newPage();
  await page.goto(`${ebayUrl}/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${productName}`, { waitUntil });
  const productList = await page.evaluate(() => {
    const results = [];
    const images = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner img.s-item__image-img');
    const names = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner h3.s-item__title');
    const ratings = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner .x-star-rating span.clipped');
    const prices = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner .s-item__details.clearfix span.s-item__price');

    images.forEach((item, index) => {
      if (index < 3) {
        results.push({
          name: names[index]?.innerHTML,
          imageUrl: item.getAttribute('src'),
          rating: ratings[index]?.innerHTML.trim().substring(0, 3),
          price: prices[index]?.innerHTML
        });
      }
    });

    return results;
  });
  return productList;
};
const searchVendors = async (req, res, next) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const { productName } = req.query;
    const [amazonVendors, ebayVendors, flipkartVendors] = await Promise.all([getAmazonVendors(browser, productName), getEbayVendors(browser, productName), getFlipkartVendors(browser, productName)]);
    res.send({ amazonVendors, ebayVendors, flipkartVendors });
  } catch (error) {
    next(error);
  } finally {
    await browser.close();
  }
};
export { searchVendors };
