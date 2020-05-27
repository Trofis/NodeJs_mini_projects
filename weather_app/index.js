const request = require('request')
//------------------------------------------------------------------------------------//
const url ='https://api.darksky.net/forecast/ea958c150aabefd383bbeda88d36185b/37.8267,-122.4233'
// Basic request
request({ url }, (error, response) => {
    // Parse the response body from JSON string into JavaScript object
    const data = JSON.parse(response.body)
    // Will print the current temperature to the console
    console.log(data.currently.temperature)
})

//automatic json parse
request({ url, json : true }, (error, response) => {
    console.log(response.body.currently.temperature)
})

//------------------------------------------------------------------------------------//
//Map box -> Weathermap request

const ville = "porto"
const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ville+'.json?access_token=pk.eyJ1IjoidHJvZmlzIiwiYSI6ImNrM3pyY2JlNjA2cDgzZm10d3JxZmpkcnQifQ.ktvTvYJNTz1sWvcB1fxEVQ&limit=1'
console.log(ville)
request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } 
    else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } 
    else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log("lat "+ville+":" +latitude,"lon "+ville+":" + longitude)
        const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=-51.2305&lon=150&APPID=0084c07dd6baefd5917ab05f3f18ed47"
        request({url:weatherURL, json: true}, (error, response)=>{
            const temp = response.body.main.temp
            console.log("température "+ville+" :"+temp)
        })
    }
})

//------------------------------------------------------------------------------------//
//Callback
/*
const geocode2 = (address, callback) => {
    setTimeout(() => {
        lat = 0
        lon = 0
        callback(lat, lon)
    }, 2000)
}
geocode2('Philadelphia', (lat, lon) => {
    console.log(lat, lon)
})

console.log("ok")*/


const {geocode, temp} = require("./src/geocode.js")


const address = process.argv[2]
geocode(address, (error, {latitude, longitude, location})=>{
    if (error){
        return console.log(error)
    }

    temp(latitude, longitude, (error, {temperature}) => {
        if (error){
            return console.log(error)
        }
        console.log("Error : ", error)
        console.log("Data : ", temperature)
    })
})

const name = 'Andrew'
const userAge = 27
const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}
// The line below uses destructuring
const { age, location:loc } = user
console.log(age)
console.log(loc)

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
    }
const transaction = (type, { label, stock }) => {
console.log(type, label, stock)
}

transaction('order', product)

const https = require('https')
const url2 ='https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/40,-75'
const request2 = https.request(url2, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request2.on('error', (error) => {
    console.log('An error', error)
})
request2.end()