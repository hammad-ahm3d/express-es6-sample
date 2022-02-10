import puppeteer from 'puppeteer';
const amazonUrl = 'https://www.amazon.com/s?k=';
const flipkartUrl = 'https://www.flipkart.com/search?q=';
const alibabaUrl = 'https://www.alibaba.com/trade/search?SearchText=';

const getFlipkartVendors = async (productName) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(flipkartUrl + productName, { waitUntil: 'networkidle0' });
  await page.waitForSelector('body');
  return 'flipkart';
};
const getAmazonVendors = async (productName) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(amazonUrl + productName, { waitUntil: 'networkidle0' });
  await page.waitForSelector('body');
  return 'amazon';
};
const getAlibabaVendors = async (productName) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(alibabaUrl + productName, { waitUntil: 'networkidle0' });
  await page.waitForSelector('body');
  return 'alibaba';
};
const searchVendors = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const { productName } = req.query;
    const amazonVendors = getAmazonVendors(productName);
    const flipkartVendors = getFlipkartVendors(productName);
    const alibabaVendors = getAlibabaVendors(productName);
    await browser.close();
    res.json({ amazonVendors, flipkartVendors, alibabaVendors });
  } catch (error) {
    next(error);
  }
};

export { searchVendors };
