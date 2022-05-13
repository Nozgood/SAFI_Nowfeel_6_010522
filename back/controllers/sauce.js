// importation 
const sauce = require('../models/sauce');
const fs = require('fs');
const user = require('../models/user');

exports.getAllSauces = (req, res, next)=> {
    sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.statsu(400).json({ error }));
};

exports.getOnesauce = (req, res, next)=> {
    sauce.findOne({ _id : req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
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
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    sauce.updateOne({ _id : req.params.id}, {...sauceObject, _id : req.params.id })
        .then(()=> res.status(200).json({ message : 'objet modifié'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next)=> {
    sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (!sauce) {
                res.status(404).json({ error : new Error('Objet non trouvé')})
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({error : new Error('Requête non authentifiée')})
            }
            const filename = sauce.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, ()=> {
                sauce.deleteOne({ _id: req.params.id})
                    .then(()=> res.status(200).json({ message : 'objet supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
};

exports.setLike = (req, res, next)=> {
    const userId = req.body.userId;
    const like = req.body.like;

    if (like == 1) {
        sauce.updateOne({ _id : req.params.id }, { $inc : {likes : like }, usersLiked : userId})
        .then(res.status(200).json({ message : 'like enregistré '}))
        .catch(error => res.status(400).json({ error }));
    } else if (like == -1) {
        sauce.updateOne({ _id : req.params.id }, { $inc : {dislikes : 1 }, usersDisliked : userId})
        .then(res.status(200).json({ message : 'dislike enregistré '}))
        .catch(error => res.status(400).json({ error }));
    } else if (like == 0) {
            sauce.updateOne(
                { _id : req.params.id, usersLiked: userId }, 
                    { 
                        $inc: {likes : -1 }, 
                        $pull : { usersLiked : userId },
                    })
                .then(()=> res.status(200).json({message : 'like annulé'}))
                .catch(error => res.status(400).json({ error }));
    }
};
