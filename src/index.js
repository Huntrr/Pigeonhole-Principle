'use strict';

import $ from 'jquery';
import Game from './game';

const NUM_PIGEONS = 6;
const NUM_BOXES = NUM_PIGEONS - 1;
const FPS = 30;

$( () => {
  // start here
  let game = new Game(NUM_PIGEONS, NUM_BOXES, FPS);
  game.init();
});
