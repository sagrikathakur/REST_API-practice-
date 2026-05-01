import express from 'express'
import 'dotenv/config'


const api = express();
const port = process.env.PORT
api.use(express.json());


// dummy database//

let myStudent = [
  { name: "sagrika", age: 40, occupation: "CEO" },
  { name: "govinda", age: 18, occupation: "student" },
  { name: "godavari mathur", age: 20, occupation: "student" }
]

// Read operation//
api.get('/myReadOperation', (req, res) => {
  res.json(myStudent)
})


// create operation//


api.post('/users', (req, res) => {
  const newUser = {
    id: myStudent.length + 1,

    name: req.body.name
  };

  myStudent.push(newUser);
  res.status(201).json(newUser);
});

// route

api.get('/home', (req, res) => {
  res.send('heyy!1')
})

api.listen(port, () => {
  console.log(`api running at ${port}`)
})