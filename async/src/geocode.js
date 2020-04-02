const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidHJvZmlzIiwiYSI6ImNrM3pyY2JlNjA2cDgzZm10d3JxZmpkcnQifQ.ktvTvYJNTz1sWvcB1fxEVQ&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

const temp = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=0084c07dd6baefd5917ab05f3f18ed47"
    request({url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                temperature: body.main.temp
            })
        }
    })    
}
module.exports = {geocode, temp}