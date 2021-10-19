const express=require('express');
const app=express();
const data=require('./data.js');

app.use(require('./routes'))

app.get('/',function(req,res)
{
res.send('Hello World!Welcome to our schedule website');
});

const server=app.listen(3000,function() {});