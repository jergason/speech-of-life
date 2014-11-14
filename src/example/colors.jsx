/** @jsx React.DOM */
var React = require('react')

var Colors = React.createClass({

  getInitialState: function() {
    return {
      colors: ["#F00", "#0F0", "#00F"],
      currentColor: "#FFF",
    }
  },

  render: function() {
    var colors = this.state.colors.map((color) => {
      return (<ColorOption color={color} onSelect={this.onColor}/>)
    })

    return <div>
      <h1>Colors</h1>
      <p><ColorDisplay color={this.state.currentColor}/></p>
      <p>
        {colors}
      </p>
    </div>
  },

  onColor: function(color) {
    this.setState({currentColor: color})
  }
})

var ColorDisplay = React.createClass({
  render: function() {
    var boxStyle = {
      backgroundColor: this.props.color,
      border: "solid 1px black",
      width: 300,
      height: 100,
    }

    return <div style={boxStyle}>
      Current Color is: <span>{this.props.color}</span>
    </div>
  }
})

var ColorOption = React.createClass({
  render: function() {

    var style = {
      backgroundColor: this.props.color
    }

    return <span>
      <button 
        style={style} 
        onClick={this.onClick}>
        Change to {this.props.color}
      </button>
    </span>
  },

  onClick: function() {
    this.props.onSelect(this.props.color)
  },
})

module.exports = Colors
