const express = require('express')
const violationRouter = require('./controllers/violationRouter')
const { onStartUp } = require('./utils/startup')

const app = express()
onStartUp()

app.use('/api', violationRouter)

const port = 3001

app.listen(port, () => console.log('Server listening on port ' + port))
