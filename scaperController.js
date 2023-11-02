let data = require("./data/index.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const scraper = require("./scraper/index");
const fs = require("fs");

const scraperController_Blogs = async (browserInstance) => {
  try {
    let browser = await browserInstance;
    let category = data.category;
    let rs = [];
    for (let j = 0; j < category.length; j++) {
      let { href, title, last_page } = category[j];
      let blogs = [];
      for (let i = 1; i <= last_page; i++) {
        let arr = await scraper.scraper_ProductCard(
          browser,
          `${href}page/${i}/`
        );
        blogs = blogs.concat(arr);
      }
      rs.push({
        category: title,
        slug: href
          .replace("https://redpillvn.org/category/redpill/", "")
          .replace("/", ""),
        blogs: blogs,
      });
    }

    await browser.close();

    return rs;
  } catch (error) {
    console.log("loi o scapercontroller " + error);
  }
};

const scraperController_AllBlog = async (browserInstance) => {
  try {
    let browser = await browserInstance;
    let arr = data.blogs;
    let rs = [];
    for (let j = 0; j < arr.length; j++) {
      let { category, slug, blogs } = arr[j];
      let rs2 = [];
      for (let i = 0; i < blogs.length; i++) {
        console.log(blogs[i].href);
        let thumbnail = blogs[i].thumbnail;
        let { title, date_submitted, content } = await scraper.scraper_Blog(
          browser,
          blogs[i].href
        );
        rs2 = rs2.concat({
          title: title,
          thumbnail: thumbnail,
          slug: blogs[i].href.replace("https://redpillvn.org/", "").replace('/',''),
          date_submitted: date_submitted,
          content: content,
        });
      }
      rs.push({
        category: category,
        slug: slug.replace("https:redpillvn.org/category/", "").replace('/',''),
        blogs: rs2,
      });
    }

    await browser.close();

    return rs;
  } catch (error) {
    console.log("loi o scaper controller all blogs " + error);
  }
};

const scraperController_Category = async (browserInstance, url) => {
  try {
    let browser = await browserInstance;
    let data = [];
    let categorys = await scraper.scraper_Category(browser, url);

    for (let i = 0; i < categorys.length; i++) {
      let { last_page } = await scraper.scraper_CategorySlug(
        browser,
        categorys[i].href
      );
      data.push({
        href: categorys[i].href,
        title: categorys[i].title,
        last_page: last_page,
      });
    }
    await browser.close();
    return data;
  } catch (error) {
    console.log("loi o scapercontroller category " + error);
  }
};
module.exports = {
  scraperController_Blogs,
  scraperController_Category,
  scraperController_AllBlog,
};
