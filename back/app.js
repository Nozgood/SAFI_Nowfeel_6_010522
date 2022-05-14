const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

// connexion à Mongoose
mongoose.connect('mongodb+srv://noz:okgoogle@projet6.tkmrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

// requête signup/login
app.use('/api/auth', userRoutes);

// gestion d'images 
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes sauces 
app.use('/api/sauces', sauceRoutes);

//exportation
module.exports = app;