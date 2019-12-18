const express= require('express');
const {bookingModel} = require('../models/bookingModel');
const bookingRouter = express.Router();

function router() {

    bookingRouter.route('/') 
        .get((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Method: PUT, POST, GET, PATCH, DELETE, OPTIONS');
            bookingModel.find((error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else if (!data) {
                    res.json({'Status':'No_Data'});
                } else {
                    res.send(data);
                }
            });
        });

    bookingRouter.route('/check')
        .post((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Method: PUT, POST, GET, PATCH, DELETE, OPTIONS');
            // console.log(req.body);
            bookingModel.findOne({date:req.body.date, time:req.body.time}, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else if(!data) {
                    res.json({'Status':'Available'});
                } else {
                    res.send(data);
                }
            });
        });

        bookingRouter.route('/save')
        .post((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Method: PUT, POST, GET, PATCH, DELETE, OPTIONS');
            // console.log(req.body);
            var bookingData = new bookingModel(req.body);
            bookingData.save((error,data) => {
                if (error) {
                    res.json({'Status':'Error!'});
                } else {
                    res.json({'Status':'Booking Successful!'});
                }
            });
        });

        bookingRouter.route('/update')
        .post((req,res) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Method: PUT, POST, GET, PATCH, DELETE, OPTIONS');
            // console.log(req.body);
            bookingModel.findOneAndUpdate({date: req.body.date, time: req.body.time}, req.body, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Booking Successful!'});
                }
            });
        });

        bookingRouter.route('/dataToday')
            .post((req,res) => {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS, PATCH');
                // console.log(req.body);
                bookingModel.find({date: req.body.date}, (error, data) => {
                    if(error) {
                        res.json({'Status':'Error'});
                    } else if (!data) {
                        res.json({'Status':'No_Data'});
                    } else {
                        res.send(data);
                    }
                });
            });

        bookingRouter.route('/delete') 
            .post((req,res) => {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS, PATCH');
                console.log(req.body);
                bookingModel.findOneAndDelete({uname: req.body.uname, date: req.body.date, time: req.body.time}, (error,data) => {
                    if (error) {
                        res.json({'Status':'Error'});
                    } else {
                        res.json({'Status':'Successfully Deleted!'});
                    }
                });
            });

            bookingRouter.route('/deleteAll') 
            .post((req,res) => {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-control-Allow-Method: GET, POST, PUT, DELETE, OPTIONS, PATCH');
                console.log(req.body);
                bookingModel.deleteMany({uname: req.body.name}, (error,data) => {
                    if (error) {
                        res.json({'Status':'Error'});
                    } else {
                        res.json({'Status':'Deleted All Booking Details Of This Player!'});
                    }
                });
            });

    return bookingRouter;
}

module.exports = router;