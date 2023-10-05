const express = require('express');
const router = express.Router();

/**
 * Router base url renders the home.ejs
 */
router.get('/',(req,res)=>{
    res.render('home')
})
/**
 * Using todo route
 */
router.use("/todo",require("./todo"))

module.exports = router;