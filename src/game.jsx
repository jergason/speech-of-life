var React = require('react');
var ticker = require('ticker');

var LIFE = require('./life');

function pickRandomCoords(board) {
  var x = Math.floor(Math.random() * board.width);
  var y = Math.floor(Math.random() * board.height);
  return {x: x, y: y};
}

function inBoard(coordinates, board) {
  return (coordinates.minX >= 0 || coordinates.maxX <= board.width || coordinates.minY >= 0 || coordinates.maxY <=  board.height);
}

function zeroOrOne() {
  return Math.floor(Math.random() * 2);
}


function expandCorners(coords) {
  return {
    minX: coords.minX - 1,
    maxX: coords.maxX + 1,
    minY: coords.minY - 1,
    maxY: coords.maxY + 1
  };
}


var Game = React.createClass({
  componentDidMount() {
    this.ctx = this.getDOMNode().querySelector('canvas').getContext('2d');
    var game = new LIFE.Board({
      width: this.props.width / 2,
      height: this.props.height / 2,
      toLive: [2, 3],
      toBirth: [3, 6]
    });

    this.setState({board: game });
    ticker(window, 60).on('tick', this.tick);
  },
  stopTicking() {
    this.setState({shouldDraw: false});
  },
  magicMissile() {
    this.stopTicking();
    var self = this;
    var coords = pickRandomCoords(this.state.board);
    var endCoords = pickRandomCoords(this.state.board);

    function drawMissile(coords, board) {
      for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
          board.board[(coords.y + j) * board.with + (coords.x + i)] = 1;
        }
      }
    }

    function tickToNewCoords(start, end, percentage) {
      return null;
    }


    var loopity = function() {
      drawMissile(coords, this.state.board);
      self.draw();

      coords = tickToNewCoords(coords, endCoords);
      if (equal(coords, endCoords)) {
        self.startTicking();
      } else {
        setTimeout(loopity, 50);
      }
    }

    setTimeout(loopity, 50);
  },
  letThereBeLight() {
    this.stopTicking();
    var self = this;

    function randomlyDrawOutsideEdges(coords, board) {
      for (var y = coords.minY; y < coords.maxY; y++){
        board.board[y * board.width + coords.minX] = zeroOrOne();
        board.board[y * board.width + coords.maxX] = zeroOrOne();
      }

      for (var x = coords.minX; x < coords.maxX; x++) {
        board.board[coords.minY * board.width + x] = zeroOrOne();
        board.board[coords.maxY * board.width + x] = zeroOrOne();
      }
      self.draw();
    }

    var randomCoords = pickRandomCoords(this.state.board);
    var coords = {
      minX: randomCoords.x, maxX: randomCoords.x,
      minY: randomCoords.y, maxY: randomCoords.y
    };

    var loopity = function() {
      randomlyDrawOutsideEdges(coords, self.state.board);
      coords = expandCorners(coords);
      if (inBoard(coords, self.state.board)) {
        setTimeout(loopity, 50);
      } else {
        self.startTicking();
      }
    }

    setTimeout(loopity, 50);
  },
  startTicking() {
    this.setState({shouldDraw: true});
  },
  tick() {
    if (this.state.shouldDraw) {
      this.state.board.step();
      this.draw();
    }
  },
  draw() {
    if (this.state.showTrails) {
      this.ctx.fillStyle = 'rgba(24,24,28,0.1)';
    }
    else {
      this.ctx.fillStyle = 'rgba(24,24,28,1)';
    }
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);

    this.ctx.fillStyle = 'white';
    for (var y = 0; y < this.state.board.height; y++){
      for (var x = 0; x < this.state.board.width; x++){
        var cell = this.state.board.board[y * this.state.board.width + x];

        if (cell == 1)
          this.ctx.fillRect(x * 2, y * 2, 2, 2);
      }
    }
  },
  render() {
    return <div>
      <canvas width={this.props.width} height={this.props.height}></canvas>
    </div>
  }
});

module.exports = Game;
