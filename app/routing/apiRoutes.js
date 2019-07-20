//Getting data from the friends array
var friends = require('../data/friends.js');

//Allows the export of the app 
module.exports = function(app) {

    // GET-api/friends route
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // POST-api/friends route 
    app.post('/api/friends', function(req, res) {
        
    		// Set variables only needed for the post
        var difference = 40;
        var nameOfMatch = '';
        var photoOfMatch = '';

        // Goes through the friends array in the fiends.js file
        friends.forEach(function(friend) {
        		// Variables for comparing matches
            var matchedScoresArray = [];
            var totalDifference = 40;

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num;
            }
            // from both the stored data and the new user, and then substracts, absolutes, and then pushes the 
            // new value to the matchedScoresArray
            for (var i = 0; i < friend.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // This reduces the matchScoresArray into a single value in a variable
            totalDifference = matchedScoresArray.reduce(add, 0);

            // If the above value is smaller than the previous difference...
            if (totalDifference < difference) {
            		// Set it as the previous difference...
                difference = totalDifference;
                // And set these variables to the appropriate friend match
                nameOfMatch = friend.name;
                photoOfMatch = friend.photo;
            }
        });
        // Once the cycle is complete, the match with the least difference will remain,
        // and that data will be sent as a json object back to the client
        res.json({
            name: nameOfMatch,
            photo: photoOfMatch
        });

        // This adds the new users sent data object to friends.js
        friends.push(req.body);
    });
}