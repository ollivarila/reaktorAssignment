const express = require('express')
require('dotenv').config()
const violationRouter = require('./controllers/violationRouter')
const { onStartUp } = require('./utils/startup')
const cors = require('cors')
const path = require('path')

const app = express()
onStartUp()

app.use(cors())

app.use('/api', violationRouter)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'dist')))
}

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Server listening on port ' + port))
