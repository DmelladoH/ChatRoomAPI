const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, 'userName required']

  },
  name: {
    type: String,
    required: [true, 'name required']
  },
  password: {
    type: String,
    required: [true, 'password required']
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }]
})

userSchema.set('toJSON', {
  transform: (documentm, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)

module.exports = User
