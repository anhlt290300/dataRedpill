const startBrowser = require("./browser");

const express = require("express");

const controller = require("./scaperController");

const app = express();

app.use(express.json());

app.get("/category", async (req, res) => {
  const browser = startBrowser();
  const url = "https://redpillvn.org/"; 
  const data = await controller.scraperController_Category(browser, url);
  res.status(200).json(data);
});

app.get("/blogs", async (req, res) => {
  const browser = startBrowser();
  const data = await controller.scraperController_Blogs(browser);
  res.status(200).json(data);
});

app.get("/all", async (req, res) => {
  const browser = startBrowser();
  const data = await controller.scraperController_AllBlog(browser);
  res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("server listen at http://localhost:4000");
});
