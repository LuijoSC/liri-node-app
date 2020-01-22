require('dotenv').config();
var colors = require('colors');
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('file-system');

// console.log(keys);
var artist = process.argv.slice(3).join(" ");
var song = process.argv.slice(3).join(" ");
var movie = process.argv.slice(3).join(" ");
//Functions test
// concertSearch();
// songSearch();
// movieSearch();
switch (process.argv[2]){
    case "concert-this":
        concertSearch();
        break;
    case "spotify-this-song":
        songSearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        whatItSays();
        break;
};

function concertSearch(){
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

function movieSearch (){
axios.get("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // console.log(response);
    console.log("The movie you chose is: ".green + response.data.Title);
    console.log("The movie came out in: ".green + response.data.Year);
    console.log("The IMDB movie's rating is: ".green + response.data.imdbRating);
    console.log("It was produced in: ".green + response.data.Country);
    console.log("The language of the movie is: ".green + response.data.Language);
    console.log("The plot of the movie is: ".green + response.data.Plot);
    console.log("The actors in the movie are: ".green + response.data.Actors)
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

function whatItSays(){
  fs.readFile("random.txt", "utf8", function (err, data){
    if(err) throw err;
    // console.log(data;
    var spotiSearch = data.split(",");
    song = spotiSearch[1];
    songSearch();
  });
};
