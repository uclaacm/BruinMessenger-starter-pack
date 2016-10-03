const utils = require('../utils')

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms

  io.of('/roomslist').on('connect', socket => {

    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', allrooms)
    })

    socket.on('createNewRoom', newRoomInput => {
      // check to see if a room with the same title exists or not
      if (!utils.findRoomByName(allrooms, newRoomInput)) {
        // Create a new room and broadcast to everyone
        allrooms.push({
          room: newRoomInput,
          roomID: utils.randomHex(),
          users: []
        })
        // emit an updated list to the creator
        socket.emit('chatRoomsList', allrooms)
        // emit an updated list to everyone connected to the rooms page
        socket.broadcast.emit('chatRoomsList', allrooms)
      }
    })
  })

  io.of('/chatroom').on('connection', socket => {
    // Join a chatroom
    socket.on('join', data => {
      let usersList = utils.addUserToRoom(allrooms, data, socket)
      console.log(usersList)
      // Update the list of active users on the chatroom page
      // broadcast change to all users
      socket.to(data.roomID).emit('updateUsersList', usersList.users)
      // emit to user who just joined
      socket.emit('updateUsersList', usersList.users)
    })

    // When a socket exists
    socket.on('disconnect', () => {
      // Find the room, to which the socket is connected to and purge the user
      let room = utils.removeUserFromRoom(allrooms, socket)
      socket.to(room.roomID).emit('updateUsersList', room.users)
    })

    // When a new message arrives
    socket.on('newMessage', data => {
      socket.to(data.roomID).emit('inMessage', data)
    })
  })
}
