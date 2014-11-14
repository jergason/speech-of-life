
var LIFE = (function(mod){
  var rBomb = [ 0, 1, 1,
                1, 1, 0,
                0, 1, 0 ];

  function LifeBoard(options){
    this.toLive = [2, 3];
    this.toBirth = [3];
    this.width = 400;
    this.height = 400;

    if (options){
      for (var prop in options)
        if (this.hasOwnProperty(prop))
          this[prop] = options[prop];
    }

    this.board = [];
    this._buffer = [];
    for (var i = 0; i < this.width * this.height; i++){
      this.board.push(0);
      this._buffer.push(0);
    }
  }

  LifeBoard.prototype = {
    seed: function(type){
      for (var i = 0; i < this.board.length; i++)
        this.board[i] = 0;

      if (!type) type = 'random';

      switch (type){
        case 'r-bomb':
          var midY = ((this.height * 0.5) | 0) - 1;
          var midX = ((this.width * 0.5) | 0) - 1;

          for (var y = midY; y < midY + 3; y++){
            for (var x = midX; x < midX + 3; x++){
              this.board[(y * this.width) + x] = rBomb[(y-midY) * 3 + (x-midX)];
            }
          }
          break;
        case 'random':
        default:
          for (var i = 0; i < this.board.length; i++)
            Math.random() > 0.6 ? this.board[i] = 1 : this.board[i] = 0;
          break;
      }
    },

    clear: function() {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          this.board[y * this.width + x] = 0;
        }
      }
    },

    step: function(){
      for (var y = 0; y < this.height; y++){
        for (var x = 0; x < this.width; x++){
          var count = 0;
          for (var dY = -1; dY <= 1; dY++){
            for (var dX = -1; dX <=1; dX++){
              if (dY == 0 && dX == 0)
                continue;

              var _y = y + dY;
              var _x = x + dX;

              _y = _y < 0 ? this.height - 1 : _y >= this.height ? 0 : _y;
              _x = _x < 0 ? this.width - 1 : _x >= this.width ? 0 : _x;

              if (this.board[_y * this.width + _x] == 1) count++;
            }
          }

          if (this.board[y * this.width + x] == 1){
            for (var j = 0; j < this.toLive.length; j++){
              if (count == this.toLive[j]){
                this._buffer[y * this.width + x] = 1;
                break;
              }
              else
                this._buffer[y * this.width + x] = 0;
            }
          }
          else {
            for (var j = 0; j < this.toBirth.length; j++){
              if (count == this.toBirth[j]){
                this._buffer[y * this.width + x] = 1;
                break;
              }
            }
          }
        }
      }

      for (var i = 0; i < this.board.length; i++)
        this.board[i] = this._buffer[i];
    }
  };

  return {
    Board: LifeBoard
  };
}());

module.exports = LIFE;
