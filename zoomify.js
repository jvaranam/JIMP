/**
 *  Compares Ol3 and Zoomify algorithms for calculating tier sizes.
 */

var DEFAULT_TILE_SIZE = 256;

/**
 *  Original Ol3 algorithm.
 */
var ol = function(imageWidth, imageHeight) {
  var tierSizeInTiles = [];
  var tileSize = DEFAULT_TILE_SIZE;

  while (imageWidth > tileSize || imageHeight > tileSize) {
    tierSizeInTiles.push([
      Math.ceil(imageWidth / tileSize),
      Math.ceil(imageHeight / tileSize)
    ]);
    tileSize += tileSize;
  }

  tierSizeInTiles.push([1, 1]);
  tierSizeInTiles.reverse();

  return tierSizeInTiles;
}

/**
 *  Zoomify algorithm.
 */
var zoomify = function(imageWidth, imageHeight) {
  var tierSizeInTiles = [];
  var tileSize = DEFAULT_TILE_SIZE;

  var width = imageWidth;
  var height = imageHeight;

  while (width > tileSize || height > tileSize) {
    tierSizeInTiles.push([
      Math.ceil(width / tileSize),
      Math.ceil(height / tileSize)
    ]);
    width = parseInt(width / 2, 10);
    height = parseInt(height / 2, 10);
  }

  tierSizeInTiles.push([1, 1]);
  tierSizeInTiles.reverse();

  return tierSizeInTiles;
};

/**
 *  Outputs tier sizes for different images sizes.
 */
var sizes = [
  [1000, 1000],
  [1024, 1024],
  [1025, 1025], // should lead to different results
  [2000, 2000],
  [2000, 2049] // should lead to different results
];

for (var i in sizes) {
  var w = sizes[i][0];
  var h = sizes[i][1];

  console.log('Size: ' + w + 'x' + h);
  console.log('Ol3:    ', ol(w, h));
  console.log('Zoomify:', zoomify(w, h), '\n');
}
