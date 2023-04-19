const mongoose=require('mongoose');
const express=require('express');
const app=express();

require('./db');
app.use(express.json())
app.use(require('./routes'))

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })