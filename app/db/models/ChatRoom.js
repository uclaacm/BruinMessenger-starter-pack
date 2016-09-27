const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatRoom = new Schema({
  name: String,
  users: [String]
})

module.exports = mongoose.model('ChatRoom', ChatRoom)
