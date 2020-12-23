const express = require('express');
const router = express.Router();

const User = require('../model/User');

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ msg: "Error when get users" })
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ msg: "Username is not exist!" })
        if (!user.isValidPassword(password)) {
            return res.status(403).json({ msg: "Wrong password!" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: "Error when login users", error })
    }
})

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        const isExist = await User.findOne({ username });
        if (isExist) return res.status(409).json({ msg: "Username is already registered" })
        const newUser = new User({ username, password })
        const user = await newUser.save();
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: "Error when create users", error })
    }
})

module.exports = router;