var React = require('react');


var Game = require('./game');

var App = React.createClass({
  getInitialState() {
    return {};
  },
  letLight() {
    this.refs.game.letThereBeLight();
  },
  startRecognizing() {
    if (this.state.recognizing) {
      return;
    }

    this.setState({recognizing: true});
    console.log("WOOOOOOOOOOOOOOOOOOOOOOO");
    var self = this;
    var recognizer = new webkitSpeechRecognition();
    recognizer.continuous = true;
    recognizer.interimResults = true;

    recognizer.onresult = function(event) {
      console.log("GOT SOME RESULT WOOOOOOOOOOOOO");
      var results = [];
      for (var j = 0; j < event.results.length; j++) {
        results.push(event.results[j][0].transcript);
      }
      console.log('got a result woooooooooo', results);
      for (var i = 0; i < event.results.length; i++) {
        if (event.results[i][0].transcript.match(/let there be light/i)) {
          self.refs.game.letThereBeLight();
          recognizer.stop();
          self.setState({recognizing: false});
          setTimeout(function() {
            self.startRecognizing()
          }, 9000);
        }
      }
    };

    recognizer.onstart = function() {
      console.log('I STARTED BROSKI');
    };

    recognizer.start();
  },
  componentDidMount() {
    console.log('I DID MOUNT WOOOOOO');
    this.startRecognizing();
  },
  render() {
    return <div>
      <Game ref="game" width="400" height="400" />
      <button onClick={this.letLight}>Let There Be Light</button>
    </div>
  }
});

React.render(<App />, document.body);
