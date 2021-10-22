const express = require('express');
const app = express();
const {users, schedules} = require('./data');
const bcrypt = require('bcrypt');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send("Welcome to our schedule website");
})

app.get("/users", (req,res) =>{  
    res.send(users);
})

app.get("/schedules", (req,res) => {   
    res.send(schedules);
})

app.get("/users/:id", (req,res) =>{  
   let id = req.params.id; 
   if(users[id]){res.json(users[id])}
   else{
       res.json('Not found')
   }
})

app.get("/users/:id/schedules", (req,res) => { 

  let id = parseInt(req.params.id);
  
  const result = schedules.filter(schedule => schedule.user_id === id);

  console.log(result)
  
  
  if(result){res.json(result)}
  else{
      res.json('Not found')
  }
  
})

app.post('/users', function(req, res) {

   const user = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password }
   users.push(user)
    res.status(201).send(user)

});

app.post('/schedules', function(req, res) {
  
  const schedule = { user_id: req.body.user_id, day: req.body.day, start_at: req.body.start_at, end_at: req.body.end_at }
  schedules.push(schedule)
    res.status(201).send(schedule)

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})