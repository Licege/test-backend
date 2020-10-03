const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/catalogs', require('./routes/catalog'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

module.exports = app
