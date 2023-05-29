# Drawing Stuff with JS!

This is a repo for a talk about the Canvas API and how to make a simple game in vanilla JS!

The page is deployed [here](https://assert-justice.github.io/snek/)!

## Drawing Stuff

- starting html and css
- the canvas api
- drawing upside down
- stealing art

### Drawing Rectangles

`fillRect(x, y, width, height)`

### Drawing Arbitrary Shapes

`moveTo(x, y)`
`lineTo(x, y)`
`beginPath()`
`fill()`

### Drawing Images

`drawImage(image, x, y, width, height)`

## Snake!

- a quick demo
- discuss game plan
- why do it this way?

### Game State

### Game Loop

- rendition
- simulate
- check for game over
- queue next loop

### User Input

- capture key events
- update direction
- prohibit backtracking

### The Tail

- coords to keys and back again
- poor man's queue
- drawing the tail
- implement self collision

### The Fruit and Scoring

- rendering
- placing
- collecting
- scoring
- difficulty

### Further Developments

- fixing bugs
- queuing inputs
- in game ui
- responsive design
- sound effects
- music
- implementing a leaderboard
- controller support