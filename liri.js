//using dotenv to hide keys
require("dotenv").config();

var dataKeys = require("./keys.js");
var fs = require('fs'); 
var Spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');

var space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = "================= Liri found this ==================";



// =================================================================
// Spotify function, Spotify api
function getMeSpotify(songName) {
    var spotify = new Spotify(dataKeys.spotify);
    // If there is no song name, set the song to "The Sign" by Ace of Base.
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                "================= LIRI FOUND THIS FOR YOU ==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(output);
           
        }
    });

}

var getMeMovie = function(movieName) {

    if (!movieName) {
        movieName = "Mr Nobody";
    }
    //Get your OMDb API key creds here http://www.omdbapi.com/apikey.aspx
    // t = movietitle, y = year, plot is short, then the API key
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=33981212";

    request(urlHit, function(err, res, body) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            var jsonData = JSON.parse(body);
            output = space + header +
                space + 'Title: ' + jsonData.Title +
                space + 'Year: ' + jsonData.Year +
                space + 'Rated: ' + jsonData.Rated +
                space + 'IMDB Rating: ' + jsonData.imdbRating +
                space + 'Country: ' + jsonData.Country +
                space + 'Language: ' + jsonData.Language +
                space + 'Plot: ' + jsonData.Plot +
                space + 'Actors: ' + jsonData.Actors +
                space + 'Tomato Rating: ' + jsonData.Ratings[1].Value +
                space + 'IMDb Rating: ' + jsonData.imdbRating + "\n";

            console.log(output);
            
        }
    });
};


var questions = [{
        type: 'list',
        name: 'programs',
        message: 'What would you like to do?',
        choices: ['Spotify', 'Movie']
    },
    {
        type: 'input',
        name: 'movieChoice',
        message: 'What\'s the name of the movie you would like?',
        when: function(answers) {
            return answers.programs == 'Movie';
        }
    },
    {
        type: 'input',
        name: 'songChoice',
        message: 'What\'s the name of the song you would like?',
        when: function(answers) {
            return answers.programs == 'Spotify';
        }
    },
   
];

inquirer
    .prompt(questions)
    .then (function (answers) {
        // Depending on which program the user chose to run it will do the function for that program
        switch (answers.programs) {
           
            case 'Spotify':
                getMeSpotify(answers.songChoice);
                break;
            case 'Movie':
                getMeMovie(answers.movieChoice);
                break;
                default:
                console.log('LIRI doesn\'t know that');
        }
    });