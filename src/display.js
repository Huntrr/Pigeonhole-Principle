'use strict';

import $ from 'jquery';

class Display {
  constructor ($pigeons, $boxes, numPigeons, numBoxes) {
    this.$pigeons = $pigeons;
    this.$boxes = $boxes;
    this.pigeons = numPigeons;
    this.maxPigeons = numPigeons;
    this.boxes = numBoxes;

    this.render()
  }

  update (numPigeons, numBoxes) {
    this.pigeons = numPigeons;
    this.boxes = numBoxes;

    this.render()
  }

  render () {
    this.$pigeons.html(
      (this.pigeons < this.maxPigeons ? 'remaining ' : '') + this.pigeons
    );

    this.$boxes.html(this.boxes);
  }
}

export default Display;
