const express = require('express')
const path = require("path");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { loginCheck, signup, cookieSetAndCheck } = require('./database.js');

const port = 3000
const app = express()


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('welcome')
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/signin.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'))
})

app.get('/err_page', (req, res) => {
    res.redirect('/login')
})

app.post('/login', urlencodedParser, function (req, res) {
    console.log(req.body.email, req.body.password)
    console.log('\n' + req.body.email + ' --> ' + req.body.password + ' --> ' + req.body.remember)

    cookieSetAndCheck(req.body.email, req.body.password, req.body.remember, res)

    loginCheck(req.body.email, req.body.password, res)
    
})

app.post('/signup', urlencodedParser, function (req, res) {

    var d = signup(req.body.email, req.body.password)
    console.log(req.body.email + ' ' + req.body.password)
    res.redirect('/login')
})

app.listen(port, () => {
    console.log("listening on port " + port)
})