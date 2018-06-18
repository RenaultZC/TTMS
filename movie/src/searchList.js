const express = require('express');
const request = require('request');
let app = express();

app.use('/searchList',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let option = {
    url:'https://box.maoyan.com/promovie/api/box/second.json',
    method : "GET"
  };
  request(option,(err,response,body)=>{
    res.send(body);
  });
});

app.listen(1234);
