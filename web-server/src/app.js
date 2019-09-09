const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

// Define app express and port
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine views location and partials
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gabriel Alves Ferreira'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gabriel Alves Ferreira'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Gabriel Alves Ferreira',
        helpText: 'dale deile dolly'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address' })
    }
    //

    const { address } = req.query

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address,
                forecast: data,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Gabriel Alves Ferreira',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Gabriel Alves Ferreira',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})