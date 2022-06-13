const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/User')

userRouter.get('/', async (request, response) => {
  const user = await User.find({})
  response.json(user)
})

userRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const user = await User.findById(id)
    response.json(user)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body
  const saltRounds = 10
  let passwordHash = null

  try {
    if (body.password) { passwordHash = await bcrypt.hash(body.password, saltRounds) }

    const user = new User({
      userName: body.userName,
      name: body.name,
      password: passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (err) {
    next(err)
  }
})

userRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

userRouter.put('/:id/changePassword', async (request, response, next) => {
  const mid = mongoose.Types.ObjectId(request.params)

  try {
    const newPasswordHash = await bcrypt.hash(request.body.newPassword, 10)
    const user = await User.findByIdAndUpdate({ _id: mid }, { password: newPasswordHash })
    return response.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

userRouter.put('/:id/changeName', async (request, response, next) => {
  const mid = mongoose.Types.ObjectId(request.params)

  try {
    const user = await User.findByIdAndUpdate({ _id: mid }, { name: request.body.newName })
    return response.status(200).json(user)
  } catch (err) {
    next(err)
  }
})
module.exports = userRouter
