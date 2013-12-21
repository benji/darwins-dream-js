darwin-dream
============

An attempt to create digital species derived from simple natural selection rules.
Uses JS/[Three.js](http://threejs.org/)/WebGL.

Goal: Watch different species emerging and taking over because they are better fit for the environment!

### Usage

  It's web based so check out the project and simply open index.html with your favorite browser!

### The Method

* Decrease of the population: aging and death

* Increase of the population: reproduction

* Environment: time cycles; produces food every cycle

### Rules of the environment

1) START: N SPECIES - maxCells=1, 1 cell organisms (everybody is pretty much equal at this stage)

2) GROWTH of a new cell at each cycle until maxCells is reached
   10% chances? of REPRODUCTION in area nearby (+/- 10 tiles?)
   1% chance of EVOLUTION/MUTATION(s) -> NEW SPECIES with 1 more cell allowed, direction of growth is random
   
3) NATURAL DEATH after 10 cycles (maxCells=10) 

4) SUN: every tile receive 1 unit of SUN/ENERGY divided as follows:
1/2 for the highest cells, then 1/4, 1/8, 1/16 etc.
A creature needs 1/2 unit of sun to survive


### TODO:
- Simulation class
- decouple rendering and model, remove circular references
- save/load Simulations to localStorage

### Implementation details

Tree structure:

World - Species - Creature - Cell

We now create/remove the all the three.js objects only when a rendering is required.
It will greatly improve performance when we don't really need frequent redering,
and thus we will spend most of the CPU time on the evolution algrithm itself.

