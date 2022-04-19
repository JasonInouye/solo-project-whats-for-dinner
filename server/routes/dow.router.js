const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
router.get('/', (req, res) => {
  // GET route code here
  const query = `
  SELECT 
    a.dow
  FROM "dow"
  ORDER by a."id" DESC
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
});

module.exports = router;