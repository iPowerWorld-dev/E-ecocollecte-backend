const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const db = require('../models');

// Get user details
router.get('/:userId', verify, async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update user
router.put('/:userId', verify, async (req, res) => {
    try {
        const updatedUser = await db.User.update(
            { name: req.body.name, email: req.body.email },
            { where: { id: req.params.userId } }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete user
router.delete('/:userId', verify, async (req, res) => {
    try {
        const removedUser = await db.User.destroy({ where: { id: req.params.userId } });
        res.json(removedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
