// importation des paquets 
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//creation du model
const userSchema = mongoose.Schema({
    email : { type : String, required : true, unique : true},
    password : {type: String, required: true},
})

// plug pour s'assurer de l'unicité des adresses mails 
userSchema.plugin(uniqueValidator);

// exportation 
module.exports = mongoose.model('user', userSchema);