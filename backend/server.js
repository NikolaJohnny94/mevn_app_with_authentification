const express = require('express')
const app = express()
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config({
  path: path.resolve('config', '.env'),
})
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const MongoDBConnect = require('./config/MongoDBConnect')
const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')
const authRoute = require('./routes/authRoute')
const errorHandler = require('./middleware/errorHandler')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const jsyaml = require('js-yaml')
const spec = fs.readFileSync(
  path.resolve(__dirname, 'config', 'collection.yml'),
  'utf8'
)

const swaggerDocument = jsyaml.load(spec)

MongoDBConnect()

app.use(express.static('public'))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/task', taskRoute)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(
    `\nApp running on: ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT} `
      .yellow.inverse
  )
})
