var WebSocketServer = require('ws').Server
var server = new WebSocketServer({ port: 8787 })
var current_coords  = JSON.stringify({ x: 160, y: 240 })

var broadcast = function(message) {
  current_coords = message
  for (var i = 0, l = server.clients.length; i < l; i++) {
    server.clients[i].send(current_coords, function(error) {
      if (error) {
        console.error(error)
      }
    })
  }
}

var handle_error = function(error) {
  console.error('error: ' + error)
}

server.on('connection', function(connection) {
  connection.send(current_coords, {
    binary: true
  })
  connection.on('message', broadcast)
  connection.on('error', handle_error)
})
