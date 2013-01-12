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
  var coords = { x: e.touches[0].pageX, y: e.touches[0].pageY }
  draw(coords)
  socket.send(
    JSON.stringify(coords)
  )
}

// UI

var w = window.innerWidth
var h = window.innerHeight
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var radius = 22

canvas.width = w
canvas.height = h
canvas.imageSmoothingEnabled = true
ctx.strokeStyle = '#ffffff'
ctx.lineWidth = 4

var clear = function() {
  ctx.clearRect(0, 0, w, h)
}

var draw = function(coords) {
  clear()
  ctx.beginPath()
  ctx.arc(coords.x, coords.y, radius, 0 , 2 * Math.PI, false)
  ctx.stroke()
  ctx.closePath()
}
