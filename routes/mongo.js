var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 3000, {auto_reconnect: true});
db = new Db('votedb', server, {w: 1});

db.open(function(err, db) {
    console.log(err);
    if(!err) {
        console.log("Connected to 'votedb'");
        db.collection('votes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'votes' collection does not exist! Creating with sample data...");
                populateDB();
            }
        });
    }
});

exports.getVotes = function(req, res) {
    db.collection('votes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

// exports.postVote = function(req, res) {
//     var vote = req.body;
//     console.log('Adding vote: ' + JSON.stringify(vote));
//     db.collection('votes', function(err, collection) {
//         collection.insert(vote, {safe:true}, function(err, result) {
//             if (err) {
//                 res.send({'error': 'Error has occurred!'});
//             } else {
//                 console.log('Success: ' + JSON.stringify(result[0]));
//                 res.send(result[0]);
//             }
//          });
//      });
// }

exports.updateVotes = function(req, res) {
    var id = req.params.id,
        vote = req.body,
        upvote = req.body.upvotes,
        downvote = req.body.downvotes,
        curDownvote = db.votes.find({_id: ObjectId("52c3b1b8ecd11f3d564076fe")}).upvotes,
        curUpvote = db.votes.find({_id: ObjectId("52c3b1b8ecd11f3d564076fe")}).downvotes;

    if (upvote - 1 > curUpvote || downvote - 1 > curDownvote) {
        res.end('error': 'HAHA I CAUGHT YOU');
        return;
    }

    // if (req.body.upvotes - db.collection('votes').)
    // check if the upvote or downvote that they are submitting is greater
    // than one vote. If so, error!


    console.log('Updating vote');
    console.log(JSON.stringify(vote));
    db.collection('votes', function(err, collection) {

        collection.update({'_id':new BSON.ObjectID(id)}, vote, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating vote: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(vote);
            }
        });
    });
}

var populateDB = function() {

    var votes = [
        {
            "upvotes": 0,
            "downvotes": 0
        }
    ];

    db.collection('votes', function(err, collection) {
        collection.insert(votes, {safe:true}, function(err, result) {});
    });

};