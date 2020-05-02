const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// Define paths for Express confin
const publicDirectoryPath = (path.join(__dirname, '../public'))
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
  res.render('index', {
    title: 'Weather App',
    name: 'Nico'
  })
})
app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
      if(error) {
        return res.send({error})
      }
      forecast(latitude, longitude, (error, foreCastData) => {
        if(error) {
          return res.send({error})
        }
        res.send({
          location,
          forecast: foreCastData,
          address: req.query.address
        })
      })
    })
  
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Nico'
    
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Nico'
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404 Error',
    error: 'Help article not found',
    name: 'Nico'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404 Error',
    error: 'Page not found',
    name: 'Nico'
  })
})

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
})  