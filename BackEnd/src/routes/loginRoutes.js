const express = require('express');
const {signupModel} = require('../models/signupModel');
const loginRouter = express.Router();

function router() {
    loginRouter.route('/')
        .post((req,res) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
            // console.log(req.body);
            signupModel.findOne({ uname:req.body.uname, password:req.body.password }, (error,data) => {
                if (error) {
                    res.json({'Status':'Error'});
                    throw error;
                } else if (!data) {
                    res.json({'Status':'User Does Not Exist'});
                } else {
                    res.json({'Status':'Success'});
                }
            });
        });

    return loginRouter;
}

module.exports = router;