const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const api = supertest(app)

const initialUsers = [
  {
    userName: 'testUser',
    name: 'test',
    password: '123'
  },
  {
    userName: 'anotherTestUser',
    name: 'anotherTest',
    password: '123'
  }
]

const saveInitialUsers = async () => {
  for (const user of initialUsers) {
    const userObj = new User(user)
    await userObj.save()
  }
}

const getAllUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

const getUser = async (id) => {
  const mid = mongoose.Types.ObjectId(id)
  const userDB = await User.find({ _id: mid })
  return userDB.map(user => user.toJSON())
}

module.exports = { initialUsers, saveInitialUsers, getAllUsers, getUser }
