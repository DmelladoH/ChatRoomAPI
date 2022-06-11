require('dotenv').config()

const connectionURI = process.env.MONGO_DB_URI
const environment = process.env.NODE_ENV

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

module.exports = { app, server }
