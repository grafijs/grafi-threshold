/**
  ## threshold method
  Threshold an image on the level passed as option

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
        - level `Number` : threshold level, from 0 to 255
        - grayscaled `Boolean` : input imageData is grayscaled or not

  ### Example
      var input = { data: Uint8ClampedArray[400], width: 10, height: 10 }
      // threshold at level 200
      grafi.threshold(input, {level: 200})
      // if input image is already grayscaled, pass grayscaeled flag to bypass redundant grayscaling
      grafi.threshold(input, {level: 200, grayscaled: true})
 */
function threshold (imgData, option) {
  // make sure data is good data
  checkColorDepth(imgData)

  // set check options object & set default options if necessary
  option = option || {}
  option.level = option.level || 127
  option.grayscaled = option.grayscaled || false

  var pixelSize = imgData.width * imgData.height
  var grayscaledData = imgData.data
  if (!option.grayscaled) {
    grayscaledData = grayscale(imgData).data
  }
  var newPixelData = new Uint8ClampedArray(pixelSize * 4)
  var lookupTable = new Uint8Array(256)
  var i, pixel, index
  for (i = option.level; i < 256; i++) {
    lookupTable[i] = 255
  }

  for (pixel = 0; pixel < pixelSize; pixel++) {
    index = pixel * 4
    newPixelData[index] = lookupTable[grayscaledData[index]]
    newPixelData[index + 1] = lookupTable[grayscaledData[index + 1]]
    newPixelData[index + 2] = lookupTable[grayscaledData[index + 2]]
    newPixelData[index + 3] = imgData.data[index + 3]
  }
  return formatter(newPixelData, imgData.width, imgData.height)
}
