const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    // Validation
    const emailExist = await db.User.findOne({ where: { email: req.body.email } });
    if (emailExist) return res.status(400).send('Email already exists');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    };

    try {
        const savedUser = await db.User.create(user);
        res.send({ user: savedUser.id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;
