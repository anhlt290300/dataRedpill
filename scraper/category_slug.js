const { autoScroll } = require("../utils/autoScroll");

const scraper_CategorySlug = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      console.log("vao " + url);
      await newPage.setViewport({ width: 1080, height: 1024 });
      //await autoScroll(newPage);
      await newPage.waitForSelector(".site-main.clear");

      const nav = await newPage.$eval(".site-main.clear", (el) => {
        nav = el.querySelector(".navigation.pagination");
        if (nav) {
          let last_page = nav.querySelectorAll(".nav-links a");
          last_page = last_page[last_page.length - 2].innerText;
          return {
            last_page: last_page,
          };
        }
        return {
          last_page: 1,
        };
      });

      await newPage.close();
      res(nav);
    } catch (error) {
      console.log("loi o scraper category " + error);
    }
  });

module.exports = scraper_CategorySlug;
