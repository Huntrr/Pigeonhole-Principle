'use strict';

import $ from 'jquery';
import Image from './image';

const Y_STEP = 1;
const Y_STEP_SPEED = 40;
const LOOP_SCREEN = false;

class Pigeon extends Image {
  constructor ($image, numColumns) {
    super($image, numColumns);

    this.speedMode = false;
    
    this.reset();
  }

  reset () {
    this.y = this.startingY();
    this.speedMode = false;
    this.xPos = Math.floor(this.numColumns / 2);

    this.render();
  }

  update () {
    this.y += this.speedMode ? Y_STEP_SPEED : Y_STEP;
    this.render()
  }

  startingY () {
    return 0 - (this.$image.height() - 10)
  }

  left () {
    if(!this.speedMode) {
      this.xPos--;
      if(this.xPos < this.minX) {
        this.xPos = LOOP_SCREEN ? this.maxX : this.minX;
      }
    }
  }

  right () {
    if(!this.speedMode) {
      this.xPos++;
      if(this.xPos > this.maxX) {
        this.xPos = LOOP_SCREEN ? this.minX : this.maxX;
      }
    }
  }

  down () {
    // ???
    this.speedMode = true;
  }
}

export default Pigeon;
