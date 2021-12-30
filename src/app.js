const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Abhishek Yelne",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Abhishek Yelne",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Type location in the box and hit search button to get weather.",
    title: "Help",
    author: "Abhishek Yelne",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Error",
    name: "help",
    errorMessage: "Help Article not found",
    author: "ZDZ",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, ForecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: ForecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "error",
    errorMessage: "404",
    author: "ZD",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
