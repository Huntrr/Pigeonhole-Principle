'use strict';

import $ from 'jquery';
import Image from './image';


const EMPTY = 'box.gif';
const FULL = 'pigeon.gif';

class Box extends Image {
  constructor ($image, numColumns, position) {
    super($image, numColumns);

    this.position = position;
    this.full = false;
    
    this.reset();
  }

  reset () {
    this.xPos = this.position;

    this.$image.attr('src', this.full ? FULL : EMPTY);
    this.render();
  }

  update () {
    this.y = $(window).height() - this.$image.height() / 3;
    this.$image.css('position', 'fixed');
    this.render()
  }

  setFull(val = true) {
    this.full = val;
    this.$image.attr('src', this.full ? FULL : EMPTY);
  }

  isFull() {
    return this.full;
  }
}

export default Box;
