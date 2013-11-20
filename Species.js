function Species(nbCreatures, maxCells, color){
  console.log("Creating new species")
  this.dna = []
  this.maxCells = maxCells
  this.color = color
  this.evolve()
  this.creatures = []
  for (var i=0;i<nbCreatures;i++){
    this.creatures.push( new Creature({species:this}) )
  }
}

Species.prototype.evolve = function(){
  if (this.dna.length < this.maxCells) this.dna.push(new DNA())
}

// probabilities for growing direction:
// x+1, x-1, y+1, y-1, z+1, z-1
function DNA(){
  this.probas = []
  var sum = 0;
  for (var i=0;i<6;i++){
    this.probas[i] = Math.random();
    sum += this.probas[i];
  }
  var sumPrev = 0
  for (var i=0;i<6;i++){
    var proba1 = this.probas[i]/sum
    this.probas[i] = proba1+sumPrev;
    sumPrev += proba1
  }
}
