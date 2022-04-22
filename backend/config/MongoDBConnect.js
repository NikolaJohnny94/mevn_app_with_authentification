const mongoose = require('mongoose')
const colors = require('colors')

const MongoDBConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL)
  console.log(
    `\nMongoDB connected! mongodb://${connection.connection.host}:${connection.connection.port}`
      .green.inverse
  )
}

module.exports = MongoDBConnect
