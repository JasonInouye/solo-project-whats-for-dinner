const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
router.get('/refrigerator', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    *
  FROM "ingredients_instock"
  WHERE UPPER("location") = 'REFRIGERATOR'
  ORDER by a."ingredients"
  ;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in Refrigerator ROUTER GET', err );
  })
});

module.exports = router;