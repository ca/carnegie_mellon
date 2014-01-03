#!/bin/bash
# Resets vote counter

sudo mongo
use votedb
db.votes.save({"_id":ObjectId("52c3b1b8ecd11f3d564076fe"), "upvotes":3841, "downvotes":300})