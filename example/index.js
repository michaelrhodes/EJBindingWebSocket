// Websockets

var socket = new Ejecta.WebSocket('ws://192.168.0.12:8787')

socket.addEventListener('open', function() {
  document.addEventListener('touchstart', touched)
})

socket.addEventListener('message', function(message) {
  var coords = JSON.parse(message)
  draw(coords)
})

socket.addEventListener('close', function() {
  document.removeEventListener('touchstart', touched)
  clear()
})

socket.addEventListener('error', function(error) {
	console.log(error)
})

var touched = function(e) {
  var coords = {
		x: e.touches[0].pageX / width_ratio,
		y: e.touches[0].pageY / height_ratio
	}
  draw(coords)
  socket.send(
    JSON.stringify(coords)
  )
}

// UI

var width = 320
var height = 480
var device_width = window.innerWidth
var device_height = window.innerHeight
var width_ratio = device_width / width
var height_ratio = device_height / height

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var radius = 22

canvas.width = device_width
canvas.height = device_height
canvas.imageSmoothingEnabled = true
ctx.strokeStyle = '#ffffff'
ctx.lineWidth = 4

var clear = function() {
  ctx.clearRect(0, 0, device_width, device_height)
}

var draw = function(coords) {
	var x = coords.x * width_ratio
	var y = coords.y * height_ratio
  clear()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0 , 2 * Math.PI, false)
  ctx.stroke()
  ctx.closePath()
}
