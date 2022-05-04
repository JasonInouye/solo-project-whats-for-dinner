const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();

router.get('/:q', (req, res) => {
    console.log( 'WTF', req.params.q);
    let searchString = req.params.q
    axios
        .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchString}`)
        .then( (response) => {
            res.send(response.data);
        })
        .catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;