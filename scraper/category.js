const scraper_Category = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      console.log("vao " + url);
      await newPage.setViewport({ width: 1080, height: 1024 });

      await newPage.waitForSelector(".widget-area.sidebar");

      const categorys = await newPage.$$eval(
        ".widget.widget_categories > ul > li",
        (els) => {
          categorys = els.map((el) => {
            let href = el.querySelector("a").href;
            let title = el.innerText;

            return {
              href: href,
              title: title,
            };
          });
          return categorys;
        }
      );

      await newPage.close();
      res(categorys);
    } catch (error) {
      console.log("loi o scraper category " + error);
    }
  });

module.exports = scraper_Category;
