const scraper_Blog = (browser, url) =>
  new Promise(async (res, reject) => {
    try {
      let newPage = await browser.newPage();
      await newPage.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
      );
      await newPage.goto(url);
      await newPage.setViewport({ width: 1080, height: 1024 });

      const blog = await newPage.$eval(".site-main > article", (el) => {
        let title = el.querySelector(".entry-header .entry-title").innerText;
        let date_submitted = el.querySelector(
          ".entry-header .entry-meta .entry-date"
        ).innerText;
        let content = el.querySelector(".entry-content").innerHTML;
        return {
          title: title,
          date_submitted: date_submitted,
          content: content,
        };
      });

      await newPage.close();
      res(blog);
    } catch (error) {
      console.log("loi o scraper blog " + error);
    }
  });

module.exports = scraper_Blog;
