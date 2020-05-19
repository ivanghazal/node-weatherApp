const request = require('request')

const weatherResult = function(latitude , longitude ,location ,callback) {
    const url = 'http://api.weatherstack.com/current?access_key=6fb406121b46e6a5cb21f9766c74fc8d&query=' + latitude + ',' + longitude

    request({url : url , json : true  }, function (error , {body}) {

        if (error) {
            callback('There is no access to the Weather API',undefined)

        }else if(body.error && (body.code = 600)) {
            callback(body.error,undefined)

        }else {
            callback(undefined,body.current.temperature)
        }

    })

}

module.exports = weatherResult