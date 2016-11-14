## Igloo Garage Sale

### Background


Igloo Garage Sale is based on the classic Neopets game, Igloo Garage Sale.  It is a 1-player game in which the computer drops items down from the garage above while the player below tries to catch all the items while avoiding the falling pianos.

### Functionality & MVP  

With Igloo Garage Sale, users will be able to:

- [ ] Move their character left, right to catch falling objects and up to jump. They lose if they drop 3 objects or get hit by a piano.

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with the game board, game controls, and nav links to my Github page, LinkedIn, and the About modal.  Game controls will include Start, Stop, Reset and Mute music buttons as well left, right and up.

![wireframes](./igloosale_screen.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle

In addition to the webpack entry file, there will be one script involved in this project:

`igloo.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

### Implementation Timeline

**Day 1**: Setup Node modules, webpack and `Easel.js`.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and start on the script above.  Learn the basics of `Easel.js`.  

**Day 2**: Dedicate this day to learning the `Easel.js` API.  Build out the `Player` object to connect to the `Board` object.


**Day 3**: Create the logic for the backend.  Build out functions for dropping the different objects at different speeds and check for misses.  Goals for the day:


**Day 4**: Create the controls so the user can interact with the game (strt, stop, reset and pause music).  Style the frontend, making it polished and professional.
