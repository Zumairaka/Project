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
                    res.json({'Status':'Error'});
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

    signupRouter.route('/getUser')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS");
            console.log(req.body);
            signupModel.findOne({uname: req.body.name}, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.send(data);
                }
            });
        });

        signupRouter.route('/getUsers')
        .get((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS");
            signupModel.find((error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.send(data);
                }
            });
        });

        signupRouter.route('/delete')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS");
            signupModel.findOneAndDelete({uname: req.body.name}, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Deleted The Player Details'});
                }
            });
        });   
        
        signupRouter.route('/edit')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS");
            console.log(req.body);
            signupModel.findOneAndUpdate({uname: req.body.uname}, req.body, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                } else {
                    res.json({'Status':'Updated The Player Details Successfully'});
                }
            });
        });

    return signupRouter;
}
module.exports = router;

