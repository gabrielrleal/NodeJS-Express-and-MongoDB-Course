const express = require ('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !== -1){//index of operation will return the index greater than or equal to zero if this is present in this array. It'll return -1 if this is not present in this array. So a very quick way of checking to see if the incoming requests origin in the whitelist.
        corsOptions = { origin: true}; //meaning that the original origin in the incoming request is in the whitelist. So I will allow it to be accepted.
    } 
    else {
        corsOptions = { origin: false};
    }
    callback(null, corsOptions);



};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
