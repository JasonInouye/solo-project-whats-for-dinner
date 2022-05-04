const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();

router.get('/:q', (req, res) => {
    let searchString = req.params.q
    axios
        .get(`https://api.spoonacular.com/recipes/${searchString}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        .then( (response) => {
            res.send(response.data);
        })
        .catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;