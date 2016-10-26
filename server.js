// Pull in everything we need to use, including Express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Set the view engine to handlebars
app.use(express.static('public'))
app.set('view engine', 'hbs')

// TODO: Serve up the login page
app.get('/', (req, res, next) => {
    // TODO
})

// TODO: Serve up the rooms page
app.get('/rooms', (req, res, next) => {
    // TODO
})

// TODO: 404 for all unregistered routes
app.use((req, res, next) => {
})

app.listen(port, () => {
  console.log('BruinMessenger running on port: ', port)
})
