var assert = require('assert')
var grafi = require('./grafi-threshold.js')

var inputData = {
  data: [255, 255, 255, 128, 10, 30, 100, 255, 128, 200, 30, 255, 200, 60, 180, 255],
  width: 2,
  height: 2
}
var rgbaData127 = grafi.threshold(inputData)
var rgbaData200 = grafi.threshold(inputData, {level: 200})
var colorcount = 0
var count127 = 0
var count200 = 0
for (var i = 0; i < rgbaData127.data.length; i++) {
  colorcount += (rgbaData127.data[i] === 0 || rgbaData127.data[i] === 255)
  count127 += (rgbaData127.data[i] === 0)
}
for (var j = 0; j < rgbaData200.data.length; j++) {
  count200 += (rgbaData200.data[j] === 0)
}

assert(rgbaData127.constructor.toString().match(/function\s(\w*)/)[1] === 'GrafiImageData',
  'returned object is an instance of GrafiImageData')

assert(count127 < count200,
  'number of black increases when level is increased')

assert(rgbaData127.data[0] === rgbaData127.data[1] && rgbaData127.data[0] === rgbaData127.data[2],
  'for RGBA mode, red, green, and blue has same value')

assert(rgbaData127.data[3] === inputData.data[3],
  'for RGBA mode, alpha channel is not altered')
