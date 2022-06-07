const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

exports.signup = (req, res, next) => {
    if(!regMail.test(req.body.email)) {
        res.status(403).json({ message : 'adresse mail non conforme' })
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser = new user({
                email: req.body.email,
                password: hash
            });
            newUser.save()
                .then(()=> res.status(201).json({ message : 'utilisateur créé'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
};

exports.login = (req, res, next)=> {
    user.findOne({ email : req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error : 'Utilisateur introuvable' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error : 'Mot de passe erroné'})
                    }
                    return res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
