const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
router.get('/', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    a.dow
  FROM "dow" a
  ORDER by a."id" ASC
  ;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in DOW ROUTER GET', err );
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log( 'Inside of the DOW POST', req.body);

  const sqlText =`
    INSERT INTO "weekly_plan" ("spoon_id", "dow", "week_number", "user_id")
    VALUES ($1, $2, $3, $4)
    ;`;
  const insertValues = [req.body.spoon_id, req.body.dow, 5, 5]

  pool.query(sqlText, insertValues)
    .then((result) => {
      console.log('Added to menu day table', insertValues);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log( 'error in DOW POST', err);
      res.sendStatus(500);
    })
});

module.exports = router;