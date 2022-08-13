//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Closet = require('./models/schema.js')
const closetSeed = require('./models/starterPack.js')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________

// seeding to database
   
    // Closet.create(closetSeed, (err, data)=> {
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log(data)
    //     }
    
//delete
app.delete('/closet/:id', (req, res) => {
    Closet.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/closet')
    })
})


//edit rout with put

app.put('/closet/:id', (req, res)=> {
    Closet.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateCloset)=>{
        res.redirect('/closet');
    })
})

app.get('/closet/:id/edit', (req, res)=>{
    Closet.findById(req.params.id, (err, foundOutfit) =>{
        res.render(
            'edit.ejs',
            {
                closet: foundOutfit
            }
        )
    })
})
    
//search


app.get('/closet/search', (req, res)=>{
    Closet.find({tags:[String]}, (String), (err, findOutfit)=>{
        res.render(
            'search.ejs',
            {
                closet: findOutfit
            }
        ) 
    })
})

//new route with post

app.get('/closet/new', (req, res)=>{
    res.render('new.ejs');
})

app.post('/closet', (req, res)=>{
    Closet.create(req.body, (err, createdOutfit)=>{
        res.redirect('/closet')
    })
})



//show route
app.get('/closet/:id', (req, res) =>{
    Closet.findById(req.params.id, (err, foundOutfit)=>{
        res.render(
            'show.ejs',
            {
                closet: foundOutfit
            }
        )
    })
})

//index route

app.get('/closet', (req, res)=>{
    Closet.find({}, (error, allOutfits)=>{
        res.render(
            'index.ejs',
            {
                closet: allOutfits
            }
        )
    })
})

// localhost:3000
//welcome page Button
app.get('/' , (req, res) => {
  res.render('test.ejs');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));



