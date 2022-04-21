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

router.get('/schedule', (req, res) => {
  // GET route code here
  const query = `
  SELECT
    a."id",
    a."spoon_id",
    a."dow",
    a."user_id",
    b."recipe_name",
    b."recipe_image"
  FROM "weekly_plan" a, "recipes" b, "dow" c
  WHERE a."spoon_id" = b."spoon_id"
  AND a."dow" = c."dow"
  ORDER BY c."id"
  ;`;
  pool.query(query)
  .then( result => {
    //console.log( 'This is the log for /schedule', result.rows);
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in SCHEDULE ROUTER GET', err );
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
  const insertValues = [req.body.spoon_id, req.body.dow, 5, req.user.id]

  pool.query(sqlText, insertValues)
    .then((result) => {
      console.log('Added to menu day table', insertValues);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log( 'error in DOW POST', err);
      res.sendStatus(500);
    });
});

router.delete ('/:id', (req,res) => {
  console.log( 'log from delete',req.params.id, req.user.id, req.user );
  const queryText = `
  DELETE FROM "weekly_plan"
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