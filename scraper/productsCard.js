const scraper_ProductCard = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      console.log("vao " + url);

      //await autoScroll(newPage);

      const blogs = await newPage.$$eval(".content-loop > div", (els) => {
        blogs = els.map((el) => {
          let thumbnail = el.querySelector(".thumbnail-link")
            ? el.querySelector(".thumbnail-link")
            : null;
          if (thumbnail) {
            return {
              href: el.querySelector(".entry-header h2 a").href,
              thumbnail: thumbnail.querySelector("div img").src,
            };
          }
          return {
            href: el.querySelector(".entry-header h2 a").href,
            thumbnail: null,
          };
        });
        return blogs;
      });

      await newPage.close();
      res(blogs);
    } catch (error) {
      console.log("loi o scraper product card " + error);
    }
  });

module.exports = scraper_ProductCard;
