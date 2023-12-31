const express = require('express')
const User = require("../models/user")
const auth = require("../middleware/auth")

const router = new express.Router();

router.post('/users',async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken()
        res.send({ user,token })
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth ,async (req,res) => {
    // const user = await User.findById("655ddad0fe7768539e4c3f77");
    // const user = await User.findOne({"name":"Andrew"})
    res.send(req.user)
})

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        await User.deleteOne({_id:req.user._id});
        res.send("Successfully Deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send("Unable to delete")
    }
})

module.exports = router