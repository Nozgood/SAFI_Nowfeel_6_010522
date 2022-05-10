const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connexion à Mongoose
mongoose.connect('mongodb+srv://nozgood:test1@opclearning.tkmrk.mongodb.net/OPCLearning?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

// captation des JSON par express + mis à dispo dans l'objet req
app.use(express.json());
// headers CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // donne l'accès à tous les URL 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// requête test
app.use((req, res, next)=> {
    res.status(200).json({message : 'bien joué'});
})
module.exports = app;