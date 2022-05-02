const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY
        ).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});



//LOGIN 
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPass = hashedPassword.toString(CryptoJs.enc.Utf8);

        const inputPass = req.body.password;
        originalPass!=inputPass && res.status(401).json("Wrong credentials!");

        const accessToken = jwt.sign(
            {
                id: user._id, 
                username: user.username, 
                email: user.email, 
            },
            process.env.SECRET_KEY,{expiresIn:"1m"}
        );
        
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;