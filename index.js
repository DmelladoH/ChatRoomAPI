require('dotenv').config()

const connectionURI = process.env.MONGO_DB_URI
const environment = process.env.NODE_ENV

const express = require('express')
const cors = require('cors')
const app = express()

const { databaseConnection, databaseDisconnection } = require('./mongo')

app.use(express.json())
app.use(cors())

databaseConnection(connectionURI, environment)

process.on('uncaughtException', () => {
  databaseDisconnection()
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

module.exports = { app, server }
