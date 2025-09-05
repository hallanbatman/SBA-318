import express from 'express';
import { database } from "../utilities/database.mjs";
const router = express.Router();

// Create
// @route: POST /user
// @desc: create user
// @access: public
router.post('/', (req, res) => {
    let { name } = req.body;

    let newDBEntry = {
        id: database.length,
        name
    }

    database.push(newDBEntry)
    res.json(201).json({ msg: 'New Entry Created', item: newDBEntry });
});

// Read
// @route: GET /user
// @desc: Get ALL user info
// @access: public
router.get('/', (req, res) => {
    //res.json({ msg: 'Testing Read' });
    res.json(database);
});

/// Update = needs paramater what to update
// @route: PUT /user/:id
// @desc: Update user
// @access: public
router.put('/:id', (req, res) => {
    let id = Number(req.params.id);

    database.splice(id, 1, req.body);
    
    //console.log(req.params.id);
    res.json({ msg: 'Item Updated', item: req.body });
});

// Delete = needs paramater what to delete
// @route: DELETE /user/:id
// @desc: delete user
// @access: public
router.delete('/:id', (req, res) => {
        let id = Number(req.params.id);

        database.splice(id, 1);

    res.json({ msg: 'Item Deleted' });
});

export default router;