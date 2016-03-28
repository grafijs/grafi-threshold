var assert = require('assert')
var grafi = require('./grafi-threshold.js')

var inputData = {
  data: [255, 255, 255, 128, 10, 30, 100, 255, 128, 200, 30, 255, 200, 60, 180, 255],
  width: 2,
  height: 2
}
var monoData127 = grafi.threshold(inputData, {monochrome: true})
var monoData200 = grafi.threshold(inputData, {level: 200, monochrome: true})
var rgbaData = grafi.threshold(inputData)
var colorcount = 0
var count127 = 0
var count200 = 0
for (var i = 0; i < monoData127.data.length; i++) {
  colorcount += (monoData127.data[i] === 0 || monoData127.data[i] === 255)
  count127 += (monoData127.data[i] === 0)
}
for (var j = 0; j < monoData200.data.length; j++) {
  count200 += (monoData200.data[j] === 0)
}

assert(rgbaData.constructor.toString().match(/function\s(\w*)/)[1] === 'ImageData',
  'returned object is an instance of ImageData')

assert(monoData127.data.length === colorcount,
  'returned data only contains black and white colors')

assert(monoData127.data.length / (monoData127.width * monoData127.height) === 1,
  'when monochrome flag is true, returned image data is single color channel')

assert(count127 < count200,
  'number of black increases when level is increased')

assert(rgbaData.data[0] === rgbaData.data[1] && rgbaData.data[0] === rgbaData.data[2],
  'for RGBA mode, red, green, and blue has same value')

assert(rgbaData.data[3] === inputData.data[3],
  'for RGBA mode, alpha channel is not altered')
