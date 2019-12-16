const express= require('express');
const {bookingModel} = require('../models/bookingModel');
const bookingRouter = express.Router();

function router() {
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
            console.log(req.body);
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
            console.log(req.body);
            bookingModel.findOneAndUpdate({date: req.body.date, time: req.body.time}, req.body, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Booking Successful!'});
                }
            });
        });

    return bookingRouter;
}

module.exports = router;