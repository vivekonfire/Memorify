const express =require('express');
const { body, validationResult } = require('express-validator');
const route = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

route.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

route.post('/',[
    body('email').isEmail(),
    body('password').exists(),
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg : "Invalid Credentials"});
        }

        if(user.password !== password){
            return res.status(400).json({msg:"Wrong Password"});
        }

        res.json({
            token:"True",
            id:user.id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

module.exports = route;