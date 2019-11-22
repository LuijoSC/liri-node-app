require('dotenv').config();
var colors = require('colors');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// console.log(keys);
var artist = process.argv.slice(2).join(" ");
var song = process.argv.slice(2).join(" ");

//Functions test
// concertSearch();
// songSearch();

function concertSearch(){
    var axios = require("axios");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response){
        for (i= 0; i < response.data.length; i++){
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.country + ", " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log("Date: " + response.data[i].datetime);
            console.log("===========================================================".green)
        }
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
};

function songSearch(){
spotify
.search({ type: 'track', query: song, limit: 1})
.then(function(response){
    // console.log(response.tracks.items);
    console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
    console.log("Title: " + response.tracks.items[0].name);
    console.log("Album: " + response.tracks.items[0].album.name);
    console.log("Preview link: " + response.tracks.items[0].preview_url)
})
.catch (function(err){
    console.log(err);
});
};