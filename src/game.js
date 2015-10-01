'use strict';

import $ from 'jquery';
import Display from './display';
import Pigeon from './pigeon';
import Box from './box';

let NUM_PIGEONS = 6;
let NUM_BOXES = 5;
let FPS = 30;

const NORMAL_BG = '#FDF3E7';
const LOSE_BG = '#DD2222';

class Game {
  constructor (pigeons, boxes, fps) {
    NUM_PIGEONS = pigeons;
    NUM_BOXES = boxes;
    FPS = fps;

    this.first = true;
  }

  update () {
    this.display.update(this.curPigeons, this.curBoxes);
    this.pigeon.update();

    for(let box of this.boxes) {
      box.update();
    }

    //If the pigeon falls too low
    if(this.pigeon.y > $(window).height() - this.pigeon.$image.height()) {
      if(this.boxes[this.pigeon.xPos].isFull()) {
        this.lose();
      } else {
        this.boxes[this.pigeon.xPos].setFull(true);
        this.pigeon.reset();
        this.curPigeons--;
        this.curBoxes--;
      }
    }
  }

  lose () {
    clearInterval(this.loop);
    $('#foreground').show();
    $('body').css('background', LOSE_BG);
    $('#background').hide();

    this.hasLost = true;
  }


  init () {
    if(!this.first) {
      //on second/third playthroughs, randomize size of game
      let maxPigeons = 10;
      let minPigeons = 3;
      NUM_PIGEONS = Math.floor(Math.random() * (maxPigeons - minPigeons + 1)) 
        + minPigeons;

      NUM_BOXES = NUM_PIGEONS - 1;
    }

    this.hasLost = false;
    $('#foreground').hide();
    $('body').css('background', NORMAL_BG);
    $('#box-box').html('');
    $('#background').show();
    this.display = new Display($('#pigeons'), $('#boxes'), NUM_PIGEONS, NUM_BOXES);
    this.curPigeons = NUM_PIGEONS;
    this.curBoxes = NUM_BOXES;

    this.pigeon = new Pigeon($('#pigeon'), NUM_BOXES);

    this.boxes = [];

    for(let i = 0; i < NUM_BOXES; i++) {
      let $newBox = $('<img id="box_' + i + '" />');
      $newBox.appendTo('#box-box');
      this.boxes.push(new Box($newBox, NUM_BOXES, i));
    }

    let _this = this;
    this.loop = setInterval(() => { _this.update(); }, 1000/FPS);


    $(document).keydown($.proxy(this.keyDown, this));

    this.first = false;
  }

  keyDown (e) {
    let key = e.keyCode;

    if(key === 65 || key === 72 || key === 37) {
      // LEFT
      this.pigeon.left();
    } else if(key === 68 || key === 76 || key === 39) {
      // RIGHT
      this.pigeon.right();
    } else if(key === 83 || key === 74 || key === 40) {
      // DOWN
      this.pigeon.down();
    }

    if(this.hasLost) {
      $(document).unbind('keydown', this.keyDown);
      this.init();
    }
  }
}

export default Game;
