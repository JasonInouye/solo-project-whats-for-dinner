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
  ORDER by "ingredient"
  ;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in Refrigerator ROUTER GET', err );
  })
});

router.delete ('/:id', (req,res) => {
  console.log( 'log from delete',req.params.id, req.user.id, req.user );
  const queryText = `
  DELETE FROM "ingredients_instock"
  WHERE "user_id" = $1 AND
  "id" = $2
  ;`;
  const queryValues = [req.user.id, req.params.id];
  pool.query(queryText, queryValues) 
    .then(() => { res.sendStatus(200);})
    .catch((err) => {
      console.log( 'Error in DELETE', err);
      res.sendStatus(500);
    });
});

module.exports = router;