const path = require('path')
const express = require('express')
const hbs = require('hbs')  //partials

const app = express()

const port = process.env.PORT || 3000

//const request = require('request')
const gecode = require('./utils/gecode')
const weatherResult = require('./utils/watherResult')
//const address = process.argv[2]


// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname ,'../templates/partials')

// setup handelbars and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'ivano ksjdsdk',
        data: {
            url : 'about',
            activeClass: "activeClass"
        }
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'kdjfklsfjk Mead',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {

    //
    if (!req.query.address){
        return res.send({
            error :'Sorry address had no reffernce ... there is no data '})
    }

    gecode(req.query.address , function (error , {latitude , longitude , location} = {} ) {
        if (error) {
            //console.log('Error', error)
            res.send({'error': error})
            return
        }
        // console.log('------------Data',data)
        weatherResult(latitude,longitude , location ,function (error,data2){
            if (error) {
                res.send({'error': error})
                return
            }
            console.log('the Final result '+ location ,data2)
            res.send({
                forecast: data2,
                location: location ,
                address: req.query.address

            })
        })
    })

})












app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error :'Sorry products had no reffernce ... there is no data '})
    }

        console.log(req.query)
        res.send({
            products : req.query.search,
            rating : req.query.rating
        })

})


app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})