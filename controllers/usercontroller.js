const router = require('express').Router();
const {UserModel} = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateJWT = require("../middleware/validate-session");


router.post('/register', async (req, res) => {
    let {firstName, 
        lastName,
        email, 
        password, 
    } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        })

        let token = jwt.sign({id: User.id, email: User.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use"
        })
    } else {
    res.status(500).json({
        message: `Failed to register user ${err}`,
    });
}
}
});

router.post('/login', async (req, res) => {
    const {email, password } = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            },
        });

        if (loginUser) {

            let passwordHashComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordHashComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
                user: loginUser,
                message: "User logged in",
                sessionToken: token
            })
    } else {
        res.status(401).json({
            message: "User not authorized"
        })
    }
    } else {
        res.status(401).json({
            message: "Inccorect email or password"
    });
}
} catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});


module.exports = router;