function absorb(o, options, defaults){
  for (var key in options) {
    o[key]=options[key]
  }
  for (var key in defaults) {
    if (!(key in o)) o[key]=defaults[key]
  }
}

function exists(v){
  return typeof v != "undefined" && v != null
}

function excludeFromHash(hash, excludes){
  var result = {}
  for (var key in hash){
    if (excludes.indexOf(key) == -1){
      result[key] = hash[key]
    }
  }
  return result
}

// random integer in [0; maxInt[
function rand(maxInt){
  return Math.floor(Math.random() * maxInt)
}

function randomTileInSquare(sqrLenTiles, excludedIdx){
  if (typeof excludedIdx == 'undefined') excludedIdx = []
  excludedIdx.sort(function(a,b){return a - b})
  
  var possibilities = Math.pow(sqrLenTiles,2) - excludedIdx.length
  if (possibilities == 0) {
    return null;
  }
  if (possibilities < 0) throw "More cells than tiles!"
  
  var randIdx = rand(possibilities)

  // TODO: use while here
  for (var i in excludedIdx) {
    if (randIdx >= excludedIdx[i]) {
      randIdx++;
    }
  }
  
  var pos = indexToPos(randIdx, sqrLenTiles)
  if (pos.x < 0){
    throw "Invalid position"
  }
  return pos
}

function posToIndex(x,y,sqrLenTiles){
  return x+sqrLenTiles*y
}
function indexToPos(idx,sqrLenTiles){
  var x = idx % sqrLenTiles
  var y = (idx-x)/sqrLenTiles
  return { x:x, y:y }
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
