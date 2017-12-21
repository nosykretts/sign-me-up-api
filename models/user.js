const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

module.exports = mongoose.model('User', userSchema)
