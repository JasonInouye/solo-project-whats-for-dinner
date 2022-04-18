const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

/** GET ROUTE **/
router.get('/', rejectUnauthenticated, (req, res) => {
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
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;