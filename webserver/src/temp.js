const request = require('request')

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

module.exports = temp
