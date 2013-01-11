var WebSocketServer = require('ws').Server
var server = new WebSocketServer({ port: 8787 })

var broadcast = function(message) {
  for (var i = 0, l = server.clients.length; i < l; i++) {
    server.clients[i].send(message, function(error) {
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
  connection.on('message', broadcast)
  connection.on('error', handle_error)
})