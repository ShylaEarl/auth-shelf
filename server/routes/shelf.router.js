const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed
  const queryText = `SELECT * FROM item;`;
  pool.query(queryText)
    .then( result => {
      res.send(result.rows);
    })
    .catch( error => {
      console.log('Error is GET items', error);
      res.sendStatus(500)
    })
});

//`SELECT * FROM item ORDER BY "id" ASC;` I accidentally wrote the get route query! SE

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const user_id = req.user.id;
  const query  = `INSERT INTO "item" ("description", "image_url", "user_id")
      VALUES ($1, $2, $3)`;
  pool.query(query, [req.body.description, req.body.image_url, user_id])
    .then(result => {
      console.log('item object POST', result.rows);
      res.sendStatus(201);
    }).catch (error => {
      console.log(error);
      res.sendStatus(500)
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  
    let reqId = req.params.id;
    console.log('Delete request id', reqId);

    let sqlText = 'DELETE FROM item ';
    pool.query(sqlText, [reqId])
    .then((result) => {
        console.log('item deleted');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })


});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
