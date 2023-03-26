const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const allRoutes = require("./routes/allRoutes")

const truc = require("./models/thing")
const richard = require("./models/user")

mongoose.connect('mongodb+srv://vincentmzapro:7yj0ugMi5h8g1XQ7@todolistappcluster.zq8xbfh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use("/manage_content", allRoutes)

app.listen(3001, (req, res)=>{
    console.log("Requête en cours...")
})
module.exports = app;
