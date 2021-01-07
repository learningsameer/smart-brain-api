const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const { response } = require("express");
const register = require('./controllers/register');
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        // user is postgres as we installed 
        password: 'test',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

app.use(express.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: "john",
//             email: "john@gmail.com",
//             password: "cookies",
//             entry: 0,
//             joining: new Date()
//         },
//         {
//             id: '124',
//             name: "saly",
//             email: "saly@gmail.com",
//             password: "bananas",
//             entry: 0,
//             joining: new Date()
//         }

//     ]
// }

app.get('/', (req, res) => {
    res.send('success');
})


app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
/*
/ --> This is working
/sign in --> Post = success /fail
/register --> Post = user (registered or not)
/profile/:userid --> Get = user
/image --> Put = updated
*/



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(3000, () => {
    console.log("App is running on port 3000");
});
