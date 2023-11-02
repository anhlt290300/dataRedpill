async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 80;
      var timer = setInterval(() => {
        //var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
}

module.exports = { autoScroll };
