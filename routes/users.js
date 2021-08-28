const express =require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,password} = req.body;
    try {
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({msg:"Email id already used"});
        }
        
        user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.json({
            token:"True",
            id:user.id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    
})

module.exports = router;