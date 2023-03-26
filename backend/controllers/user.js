const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User ({
            email: req.body.email,
            password: hash,
            secretQuestion: req.body.secretQuestion,
            answerToSecretQuestion: req.body.answerToSecretQuestion
        })
        user.save()
            .then(()=>res.status(201).json({message: 'Utilisateur crée !'}))
            .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({message: 'Utilisateur ou mot de passe incorrect !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid=>{
                    if(!valid){
                        return res.status(401).json({message: 'Utilisateur ou mot de passe incorrect !'})
                    }
                    console.log('coucou')
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error=>res.status(501).json({error}))

        })
        .catch(error=>res.status(500).json({error}))
};

//ALLOW USER TO SET UP SECRET QUESTION AND ANSWER
exports.addSecretQuestionAndAnswer = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {$set: {secretQuestion: req.body.secretQuestion, answerToSecretQuestion: req.body.answerToSecretQuestion}})
    .then(()=>{res.status(201).json({message:"Votre question et votre réponse ont bien été ajoutées à votre compte !"})})
    .catch(error => {res.status(400).json(error)})
}

// UPDATING PASSWORD ANSWERING TO SECRET QUESTION

// 1 -- SEND THE SECRET QUESTION IF THE USER HAS SET UP ONE 
exports.getSecretQuestion = (req, res, next) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if(user.secretQuestion){
            res.status(200).json(user.secretQuestion)
        }
    })
    .catch(error => {res.status(400).json({error})})
}

// 2 -- CHECK IF THE ANSWER OF THE SECRET QUESTION IS OK
exports.answerSecretQuestion = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user=>{
        const rightAnswer = user.answerToSecretQuestion.toLowerCase()
        const userAnswer = req.body.answerToSecretQuestion.toLowerCase()
        if(userAnswer === rightAnswer){
            res.status(200).json({message: "Réponse correcte !"})
        }
    })
    .catch(error => {res.status(400).json({error})})
}

// 3 -- UPDATING PASSWORD
// INVOLVES 2 USE CASES : 
// EITHER THE USER LOST HIS PASSWORD
// EITHER HE JUST WANTS TO MODIFY IT FROM HIS ACCOUNT
exports.updatePassword = (req, res, next) => {
    if(req.body.isPasswordForgotten === true){
        bcrypt.hash(req.body.password, 10)
        .then(hash=>{
            User.updateOne({email: req.body.email}, {$set:{password:hash}})
            .then(()=>{res.status(200).json({message : "Mot de passe réinitialisé !"})})
            .catch(error => {res.status(400).json({error})}) 
            })
        .catch(error => {res.status(500).json({error})})
    }else if(req.body.isPasswordForgotten === false){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.updateOne({_id: req.body.userId}, {$set:{password:hash}})
            .then(()=>{res.status(201).json({message : "Mot de passe modifié !"})})
            .catch(error=>{res.status(400).json({error})})
        })
        .catch(error=>{res.status(500).json({error})})
    }

}