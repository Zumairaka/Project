const express = require('express');
const signupRouter = express.Router();
const {signupModel} = require('../models/signupModel');

function router() {
    signupRouter.route('/')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS");
            signupModel.findOne({uname:req.body.uname}, (error,data)=> {
                if (error) {
                    throw error;
                } else {
                    if (!data) {
                        var player = new signupModel(req.body);
                        player.save((error,data) => {
                            if (error) {
                                res.json({'Status':'Error'});
                            } else {
                                res.json({'Status':'Success'});
                            }
                        });
                    } else {
                        res.json({'Status':'User Already Exists'});
                    }
                }
            });
        });
    return signupRouter;
}
module.exports = router;

