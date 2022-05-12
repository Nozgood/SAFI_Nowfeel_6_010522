//importation package necessaire
const mongoose = require('mongoose');

// sauce model // need to check if usersLiked / disliked correctly run or not
const sauceModel = mongoose.Schema({
    userId: {type: String, required: true},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type : String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [],
    usersDisliked: [],
})

module.exports = mongoose.model('sauce', sauceModel);