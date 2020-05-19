const request = require('request')

const gecode =  (address , callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiaXZhbmdoYXphbCIsImEiOiJja2E1Z282Z2owcGg2M2ZxajI5ZnhtNTZoIn0.VsR2mZv8knGL2fmdqCEXxg&limit=1"

    request({url : url , json : true  } , function (error , {body} ) {
        if (error) {
            callback('There is no access to Gecode mapbox service  ',undefined)
        }else if (!body.features[0]){
            callback('Please check the name of the City , there is no match ',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0] ,
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = gecode