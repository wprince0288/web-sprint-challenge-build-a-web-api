// Write your "actions" router here!
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Fetching' });
});

router.post('/', (req, res) => {
    const action = req.body;
    res.status(201).json({ message: 'Action created', action });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Fetching actions with ${id}` });
});

module.exports = router;