const path = require('path')
const express = require('express')
const app = express();
var bodyparser = require('body-parser')
const db = require('./config/mongoose');
const port=8000;
/**
 * Setting the ejs template as view engine
 */
app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))
/**
 * Setting the path for static files such as images, js, css. In our case "assets" is the directory
 */
app.use(express.static(path.join(__dirname, 'assets')))
/**
 * Using body-parser middleware for extraction the data from request body.
 */
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
/**
 * Using the express router 
 */
app.use('/',require('./routes'))

/**
 * Server listening on port
 */
app.listen(port, ()=>{
    console.log("server is running")
})