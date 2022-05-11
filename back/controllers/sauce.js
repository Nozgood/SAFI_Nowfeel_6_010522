// importation 
const sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next)=> {

};

exports.getOnesauce = (req, res, next)=> {

};

exports.createSauce = (req, res, next)=> {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const newSauce = new sauce({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    newSauce.save()
        .then(()=> res.status(201).json({message : 'sauce ajoutée avec succès'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next)=> {
    
};

exports.deleteSauce = (req, res, next)=> {
    
};

exports.setLike = (req, res, next)=> {
    
};