require('dotenv').config();
var keys = require("./keys.js");
var spotify = keys.spotify;

// console.log(keys);
var artist = process.argv.slice(2).join(" ");

console.log(artist);

var axios = require("axios");
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response){
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue Location: " + response.data[0].venue.country + ", " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log("Date: " + response.data[0].datetime)
    })
    .catch(function(error){
        if (error.response){
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request){
            console.log(error.request);  
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config)
    });