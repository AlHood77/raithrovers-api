const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const publications = [
  {
    name: "BBC",
    address: "https://www.bbc.co.uk/sport/football/scottish-championship",
    base: "",
  },
  {
    name: "TheDailyRecord",
    address: "https://www.dailyrecord.co.uk/all-about/scottish-championship",
    base: "",
  },
  {
    name: "TheScottishSun",
    address:
      "https://www.thescottishsun.co.uk/sport/football/scottish-championship/",
    base: "",
  },
  {
    name: "TheScotsman",
    address: "https://www.scotsman.com/sport/football/scottish-championship",
    base: "https://www.scotsman.com",
  },
  {
    name: "TheIndependent",
    address: "https://www.independent.co.uk/topic/scottish-championship",
    base: "",
  },
  {
    name: "FifeFreePress",
    address: "https://www.fifetoday.co.uk/sport/football/raith-rovers",
    base: "https://www.fifetoday.co.uk",
  },
  {
    name: "TheCourier",
    address: "https://www.thecourier.co.uk/category/sport/football/",
    base: "",
  },
];

const articles = [];

publications.forEach((publication) => {
  axios.get(publication.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("Raith")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      articles.push({
        title,
        url: publication.base + url,
        source: publication.name,
      });
    });
  });
});

app.get("/", (request, response) => {
  response.json("Welcome to my Raith Rovers News API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:publicationId", (req, res) => {
  const publicationId = req.params.publicationId;

  const publicationAddress = publications.filter(
    (publication) => publication.name == publicationId
  )[0].address;
  const publicationBase = publications.filter(
    (publication) => publication.name == publicationId
  )[0].base;

  axios
    .get(publicationAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];

      $('a:contains("Raith")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        specificArticles.push({
          title,
          url: publicationBase + url,
          source: publicationId,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
