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

exports.updateVotes = function(req, res) {
    var id = req.params.id,
        vote = req.body,

        upvote = req.body.upvotes,
        downvote = req.body.downvotes,
        curDownvote = 0,
        curUpvote = 0;

        db.collection('votes', function(err, collection) {
            collection.find().toArray(function(err, items) {
                curDownvote = items[0].downvotes;
                curUpvote = items[0].upvotes;
                console.log("upvotes sent in request: " + upvote);
                console.log("upvotes currently in db: " + curUpvote);

                if (curDownvote == downvote) {
                    if (curUpvote + 1 != upvote) {
                        console.log('Someone trying to send many upvotes');
                        res.send({'error':'Gotcha! It was a nice try though.'});
                        return;
                    } else {
                        collection.update({'_id':new BSON.ObjectID(id)}, vote, {safe:true}, function(err, result) {
                            if (err) {
                                console.log('Error updating vote: ' + err);
                                res.send({'error':'An error has occurred'});
                            } else {
                                console.log('' + result + ' document(s) updated');
                                res.send(vote);
                            }
                        });
                    }
                } else if (curUpvote == upvote) {
                    if (curDownvote + 1 != downvote) {
                        console.log('Someone trying to send many downvotes');
                        res.send({'error':'Gotcha! It was a nice try though.'});
                        return;
                    } else {
                        collection.update({'_id':new BSON.ObjectID(id)}, vote, {safe:true}, function(err, result) {
                            if (err) {
                                console.log('Error updating vote: ' + err);
                                res.send({'error':'An error has occurred'});
                            } else {
                                console.log('' + result + ' document(s) updated');
                                res.send(vote);
                            }
                        });
                    }
                }
            });
        });

    console.log('Updating vote');
    console.log(JSON.stringify(vote));
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