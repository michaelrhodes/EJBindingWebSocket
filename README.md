# EJBindingWebSocket
An [Ejecta](https://github.com/phoboslab/Ejecta) extension to introduce WebSocket support.

## Setup
EJBindingWebSocket depends on [SocketRocket](https://github.com/square/SocketRocket), so add all the files in [SocketRocket/SocketRocket](https://github.com/square/SocketRocket/tree/master/SocketRocket) to the Ejecta project, followed by `EJBindingWebSocket.h` and `EJBindingWebSocket.m`.

Unlike Ejecta, SocketRocket requires ARC. Because of this, you will need to add the `-fobjc-arc` flag to `SRWebSocket.m` in Build Phases > Compile Sources.

## Usage
	var socket = new Ejecta.WebSocket('ws://192.168.0.12:8787')
	
	socket.addEventListener('open', function() {})
	socket.addEventListener('message', function(message) {})
	socket.addEventListener('error', function(error) {})
	socket.addEventListener('close', function() {})
	
	socket.send("string")
	socket.close()
	
### Example
Inside [EJBindingWebSocket/example](https://github.com/michaelrhodes/EJBindingWebSocket/tree/master/example) you will find two files. `index.js` goes into your /App folder, while `server.js` is run with [node](https://github.com/joyent/node) with a single dependency: [ws](https://github.com/einaros/ws).

## Todo
- Support for non-string types