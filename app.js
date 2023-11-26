//corrected by suvojit dada
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    console.log(req.body.city);


    const query = req.body.city;
    const apiKey = "8fe11c4b438849861a0cb032660536f2"
    const unit = "metric"

    // "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=8fe11c4b438849861a0cb032660536f2&units=metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    try {
        https.get(url, function (response) {
            response.on("data", function (data) {
                const weatherData = JSON.parse(data);
                console.log("Weather Data", weatherData);
                const temp = weatherData.main.temp;
                //const temp = weatherData["main"]["temp"];
                // res.write(temp.toString());
                const icon = weatherData.weather[0].icon;
                const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<h1>The temperature in " + query + " is " + temp + "</h1>")
                res.write("<img src=" + imgURL + ">");
                console.log("POST:" + query);
                res.send();

            })
        });


    } catch (err) {
        console.log("Error", err);
    }
    console.log("Post received.")



})













app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

















//axios
// const axios = require('axios');

// axios.get('https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=8fe11c4b438849861a0cb032660536f2&units=metric')
//     .then(response => {
//         console.log(response.data.url);
//         console.log(response.data.explanation);
//     })
//     .catch(error => {
//         console.log(error);
//     });
