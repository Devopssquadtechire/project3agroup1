const { response, json } = require('express');
const express=require('express');
const { schedules } = require('../data.js');
const { users } = require('../data.js');
const router = express.Router();
const data=require('../data.js');

router.get('/users',function(req,res)
{
res.send(users);
});

//express will find anyting that i pass in the url after /users/ and consider id as index of object values
//Also uses query sample as well
router.get('/users/:id', function(req, res) {
    let id = req.params.id;
    console.log(id)
    res.json(users[id]);
    console.log(users[id]);
});

router.get('/users/:id/schedules', function(req, res) {
    const id = parseInt(req.params.id);
    const newScheduleArr = [];
    for (ele in schedules){        
        let schedule_user_id = schedules[ele].user_id
        if (schedule_user_id === id){
            newScheduleArr.push(schedules[ele])            
        }
    }
    (newScheduleArr.length===0)?res.send("No schedules are found for this user"):res.json(newScheduleArr)
});

router.get('/schedules',function(req,res)
{
res.send(data.schedules);
});

router.get('/schedules/:scheduleId',function(req,res)
{
    let id = req.params.scheduleId
    res.json(schedules[id]);
});


// Route to create a schedule :
// ❒ It is possible to request the route '/schedules' in POST
// ❒ This route creates a new schedule from the fields user_id, day, start_at and end_at provided in POST
// ❒ The fields user_id and day are saved as int
// ❒ The route returns the newly created schedule
// user_id"="bose","day"="3","start_at"="3PM","end_at"="4.30PM"

const bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/schedules',urlencodedParser,function(req,res){
    newScheduleItem = {"user_id":0,"day":0,"start_at":"","end_at":""}
    newScheduleItem = req.body    
    // newScheduleItem.user_id = parseInt(req.body.user_id)
    // newScheduleItem.day = parseInt(req.body.day)
    console.log(newScheduleItem)
    console.log(req.body)
    return res.end(JSON.stringify(req.body))
    res.sendStatus(200)
})



// Route to create a user :
// ❒ It is possible to request the route '/users' in POST
// ❒ This route creates a new user from the firstname, lastname, email and password fields provided in POST
// ❒ The password is not saved in clear text, but it is encrypted in SHA256.
// ❒ The route returns the newly created user

router.post('/users',urlencodedParser,function(req,res){
    newUserItem = {"firstname":"","lastname":"","email":"","password":""}
    newUserItem = req.body
    // newScheduleItem.user_id = parseInt(req.body.user_id)
    // newScheduleItem.day = parseInt(req.body.day)
    console.log(newUserItem)
    console.log(req.body)
    return res.end(JSON.stringify(req.body))
    res.sendStatus(200)
})

module.exports=router;