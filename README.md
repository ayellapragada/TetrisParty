# Tetris Party

## Background

### A Tetris clone with the addition of multiplayer.

Tetris is a tile-matching puzzle game that involves falling tetrominos into a
well, where the game ends when the pieces reach the top. A row is cleared out
whenever all tiles in that row are filled up.

The multiplayer component will be similar to 1 player tetris, with the addition
that whenever one player clears out more than one row at a time, an opposing
player will get a proportional number of additional lines at the bottom of their
well, with a piece randomly missing. 

1) There are 7 pieces that can each be rotated into 4 different positions.

2) Each piece will drop down at a timed interval, that will change based on what
level the player is on.

3) Rows are cleared out when all tiles in there are being filled.

4) If playing multiplayer, whenever one player clears out more than one spot at
a time, other players will get an extra row added to the bottom of their screen.

## MVP


This Tetris game will involve features mentioned in the rules above. 
- [ ] Rows get cleared out as they get filled up. 
- [ ] Varying game speeds depending on level.
- [ ] Realtime multiplayer.
- [ ] A production README.

## Wireframes

TBD.

Below the game screen there will be links to my Github and LinkedIn.

## Architecture and Technologies

JavaScript for game logic, and handling user input.
Webpack to bundle and load js files.
Canvas to render on the screen.

## Implementation Timeline

**Day 1-2**. Setup all necessary modules and libraries. Get Tetris single player
working.

**Day 3-4**. Add multiplayer. 

## Future Work

- [ ] Better game room finding.
- [ ] Special bricks and pieces that have extra effects.
- [ ] View high scores for all players who've played the game.
