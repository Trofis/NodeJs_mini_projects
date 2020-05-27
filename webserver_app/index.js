const path = require("path")
const express = require("express")
const hbs = require("hbs")
const fetch = require("node-fetch")


const geocode = require('./src/geocode.js')
const temp = require('./src/temp.js')

const app = express()

const publicDirectoryPath =path.join(__dirname, "./public")
const viewsPath = path.join(__dirname, "./template/views")
const partialViewsPath = path.join(__dirname, "./template/partials")

hbs.registerPartials(partialViewsPath)

app.set('views', viewsPath)
app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))



app.get('', (req, res) =>{    
    res.render('home', {
        title:"Home Weather"
    })
    
})

app.get('/weather', (req, res) => {
    geocode(req.query.address, (error, {latitude, longitude, location})=>{
        if (error){
            return console.log(error)
        }
    
        temp(latitude, longitude, (error, {temperature}) => {
            if (error){
                return console.log(error)
            }
            console.log("Error : ", error)
            res.send({
                location,
                latitude,
                longitude,
                temperature
            })
        })
    })
    
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title:"About me",
        author: "Thomas Mendes"
    })
})


app.get('/help', (req, res) =>{
    res.render('help', {
        title:"Help"
    })
})


app.get("*", (req, res) => {
    res.render('404', {
        title:'404',
        error:'This page does not exist'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

