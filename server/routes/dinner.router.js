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
  a."recipe_image"
  FROM "recipes" a
  WHERE a."favorited" = true
  ORDER by a."id" DESC
  ;`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in dinner ROUTER GET', err );
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;