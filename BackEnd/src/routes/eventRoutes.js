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

    eventRouter.route('/getEvents') 
        .get((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Method: PUT, POST, GET, PATCH, DELETE, OPTIONS');
            eventModel.find({}).sort({'date':'desc','time':'asc'}).exec(function (error,data) {
                if (error) {
                    res.json({'Status':'Error'});
                } else if (!data) {
                    res.json({'Status':'No_Data'});
                } else {
                    res.send(data);
                }
            });
        });

        eventRouter.route('/getEvent') 
        .post((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS, PATCH');
            console.log(req.body);
            eventModel.findOne({uname: req.body.uname, date: req.body.date, time: req.body.time}, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.send(data);
                }
            });
        });


    eventRouter.route('/delete') 
        .post((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS, PATCH');
            console.log(req.body);
            eventModel.findOneAndDelete({uname: req.body.uname, date: req.body.date, time: req.body.time}, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Deleted This Event Successfully!'});
                }
            });
        });


    return eventRouter;
}

module.exports = router;