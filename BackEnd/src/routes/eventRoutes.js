const express = require('express');
const {eventModel} = require('../models/eventModel');
const eventRouter = express.Router();

function router() {
    eventRouter.route('/')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
            console.log(req.body);
            var event = new eventModel(req.body);
            event.save((error, save) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Event Saved Successfully'});
                }
            });
        });

    return eventRouter;
}

module.exports = router;