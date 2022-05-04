const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTES **/
//GET for refrigerator
router.get('/refrigerator', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    *
  FROM "ingredients_instock"
  WHERE UPPER("location") = 'REFRIGERATOR'
  AND "user_id" = $1
  ORDER by UPPER("ingredient")
  ;`;
  pool.query(query, [req.user.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in Refrigerator ROUTER GET', err );
  })
});

// GET for pantry
router.get('/pantry', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    *
  FROM "ingredients_instock"
  WHERE UPPER("location") = 'PANTRY'
  AND "user_id" = $1
  ORDER by UPPER("ingredient")
  ;`;
  pool.query(query, [req.user.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in Pantry ROUTER GET', err );
  })
});

//GET for ALL ingredients
router.get('/all', (req, res) => {
  // GET route code here

  
  const query = `
  SELECT 
    string_agg(ingredient, ',') as all_ingredients 
  FROM "ingredients_instock"
  WHERE "user_id" = $1
  ;`;
  pool.query(query, [req.user.id])
  
  .then( result => {
    res.send(result.rows);
    console.log('This is a list of all INGREDIENTS', result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in spices ROUTER GET', err );
  })
});

//GET for spices
router.get('/spices', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    *
  FROM "ingredients_instock"
  WHERE UPPER("location") = 'SPICES'
  AND "user_id" = $1
  ORDER by UPPER("ingredient")
  ;`;
  pool.query(query, [req.user.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log( 'ERROR in spices ROUTER GET', err );
  })
});

/** POST **/
router.post('/', (req, res) => {
  // POST route code here
  console.log( 'Inside of the INGREDIENT POST', req.body);

  const sqlText =`
    INSERT INTO "ingredients_instock" ("ingredient", "location", "user_id")
    VALUES ($1, $2, $3)
    ;`;
  const insertValues = [req.body.ingredient, req.body.location, req.user.id]

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

/** DELETE **/
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

/** PUT  EDIT Ingredients **/
router.put('/:id', (req, res) => {
  // Update this single student
  const idToUpdate = req.params.id;
  const sqlText = `UPDATE ingredients_instock SET ingredient = $1 WHERE id = $2`;
  pool.query(sqlText, [req.body.ingredient, idToUpdate])
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});

module.exports = router;