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
  AND a."user_id" = $1
  ORDER by a."id" DESC
  ;`;
  pool.query(query, [req.user.id])
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
  console.log( 'inside of Favorite POST', req.body);
  const sqlText =`
  INSERT INTO "recipes" ("spoon_id", "recipe_name", "recipe_image", "user_id")
  VALUES ($1, $2, $3, $4)
  ;`;
const insertValues = [req.body.spoon_id, req.body.recipe_name, req.body.recipe_image, req.user.id]

pool.query(sqlText, insertValues)
.then((result) => {
  console.log('Added to recipe table', insertValues);
  res.sendStatus(201);
})
.catch((err) => {
  console.log( 'error in Fav POST', err);
  res.sendStatus(500);
});
});

/** DELETE FAVORITE **/
router.delete ('/:id', (req,res) => {
  console.log( 'log from delete',req.params.id, req.user.id, req.user );
  const queryText = `
  DELETE FROM "recipes"
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