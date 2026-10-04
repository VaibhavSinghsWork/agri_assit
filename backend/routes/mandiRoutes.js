const express = require("express");

const {
    getPrices
} = require("../controllers/mandiController");


const router = express.Router();


router.get("/prices", getPrices);


module.exports = router;