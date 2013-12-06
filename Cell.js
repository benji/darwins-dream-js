function Cell(options){
  absorb(this, options)
  LOGGER.debug("New cell at "+this.x+","+this.y+","+this.z)
  this.threeObject = createCube(this.x, this.y, this.z, this.creature.species.color)
  if (typeof SCENE != "undefined") SCENE.add(this.threeObject)
  WORLD.cellsRegistry.add(this)
}

Cell.prototype.die = function(){
  if (typeof SCENE != "undefined") SCENE.remove(this.threeObject)
  WORLD.cellsRegistry.remove(this)
}
