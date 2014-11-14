/** @jsx React.DOM */
var React = require('react')

var Hello = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.params.name}</h1>
  },
})

module.exports = Hello
