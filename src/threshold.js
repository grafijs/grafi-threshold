/**
  ## threshold method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object
        - mode `String` : grayscaling mode, 'luma', 'simple', or 'average'
        - monochrome `Boolean` : output to be monochrome (single color depth) image

  ### Example
      //code sample goes here
 */
function threshold (imgData, option) {
  // set check options object & set default options if necessary
  option = option || {}
  option.level = option.level || 127
  option.monochrome = option.monochrome || false
  var pixelSize = imgData.width * imgData.height
  var grayschaledMonoImage = grayscale(imgData, {monochrome: true})
  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))
  var lookupTable = new Uint8Array(256)
  var i, p, _index
  for (i = option.level; i < 256; i++) {
    lookupTable[i] = 255
  }

  for (p = 0; p < pixelSize; p++) {
    if (option.monochrome) {
      newPixelData[p] = lookupTable[grayschaledMonoImage.data[p]]
      continue
    }
    _index = p * 4
    newPixelData[_index] = lookupTable[grayschaledMonoImage.data[p]]
    newPixelData[_index + 1] = lookupTable[grayschaledMonoImage.data[p]]
    newPixelData[_index + 2] = lookupTable[grayschaledMonoImage.data[p]]
    newPixelData[_index + 3] = imgData.data[_index + 3]
  }
  return formatter(newPixelData, imgData.width, imgData.height)
}
