const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;