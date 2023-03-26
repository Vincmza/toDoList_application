const Thing = require("../models/thing")
const User = require("../models/user")

exports.getAllThings = (req, res, next) => {
    //console.log("REQUETE GET ==> ", req.params.id)
    Thing.find().where("userIdentfier").equals(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(500).json({error}))
}

exports.createThing = (req, res, next) => {
    const data = new Thing({
        description: req.body.description,
        userIdentifier: req.params.id,
        isDone: false
    })
    data.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyThing = (req, res, next) => {
    Thing
    .updateOne({_id: req.params.thingID}, {$set: {description: req.body.description, isDone: req.body.isDone}})
    .then(() => res.status(200).json({message: "Objet modifié avec succès !"}))
    .catch(error => res.status(400).json({error}))
}

exports.deleteOneThing = (req, res, next) => {
    console.log("DELETE ONE ==> ", req.params)
    Thing
    .deleteOne({_id: req.params.thingID})
    .then(() => res.status(200).json({ message: 'Objet supprimé avec succès !'}))
    .catch((error)=> res.status(500).json({error}))
}

exports.deleteAll = (req, res, next) => {
    if(req.params.isDone == "null"){
        Thing.deleteMany({userIdentifier: req.params.id})
        .then(()=> res.status(200).json({message: "Toutes vos tâches ont été supprimées !"}))
        .catch(error=>res.status(400).json({error}))
    }else if(req.params.isDone == "true"){
        Thing.deleteMany({userIdentifier: req.params.id, isDone: true})
        .then(()=> res.status(200).json({message: "Toutes vos tâches accomplies ont été supprimées !"}))
        .catch(error=>res.status(400).json({error}))
    }else if(req.params.isDone == "false"){
        Thing.deleteMany({userIdentifier: req.params.id, isDone: false})
        .then(()=> res.status(200).json({message: "Toutes vos tâches en attente ont été supprimées !"}))
        .catch(error=>res.status(400).json({error}))
    }
}


