const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", (req, res) => {
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "8c2e73c2499a295892d46696368b0a28"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + apiKey;

  https.get(url, (response) => {
    console.log(response.statusCode)

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<h1>The temprature in ${query} is ${temp} degrees Celcius</h1>`);
      res.write(`<img src= ${imageURL} />`);
      res.send();


    });
  });
})





app.listen(3000, () => {
  console.log("Your Server has started and is running on port 3000.")
})
