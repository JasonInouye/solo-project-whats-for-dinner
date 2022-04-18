const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
router.get('/', (req, res) => {
  // GET route code here
  const query = `
    SELECT 
      a."id",
      a."spoon_id",
      a."recipe_name",
      a."recipe_image",
      b."ingredient"
    FROM "recipes" a, "recipe_used_ingredients" b
    WHERE a."user_id" = b."user_id"
    AND a."favorited" = true
    ORDER by a."id" DESC
    ;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in dinner ROUTER GET', );
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;