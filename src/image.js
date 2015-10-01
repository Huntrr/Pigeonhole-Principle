'use strict';

import $ from 'jquery';

const MARGIN = 20;

class Image {
  constructor ($image, numColumns) {
    this.$image = $image;
    this.numColumns = numColumns
    this.fromTop = true;

    this.xPos = Math.floor(numColumns / 2);
    this.minX = 0;
    this.maxX = numColumns - 1;

    this.init(numColumns);
    
    this.y = 0;

    this.render();
  }

  update () {
    this.render();
  }

  init (numColumns) {
    this.$image.css(
      'width', 'calc(' + (100/numColumns) + '% - ' + (2*MARGIN/numColumns) + 'px)'
    );
  }

  render () {
    let fromTop = this.fromTop;
    let screenWidth = $(window).width();
    let screenHeight = $(window).height();

    let x = MARGIN + ((screenWidth - 2 * MARGIN)/this.numColumns)*this.xPos;

    this.$image.css(fromTop ? 'top' : 'bottom', this.y + 'px');
    this.$image.css('left', x + 'px');
  }
}

export default Image;
