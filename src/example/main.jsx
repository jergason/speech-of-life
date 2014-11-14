
/** @jsx React.DOM */
var React = require('react')

var Hello = React.createClass({
  render: function() {
    return <div>
      <h1>Main</h1>
      <ul>
        <li><a href="#/hello/world">Hello World</a></li>
        <li><a href="#/colors">Colors</a></li>
      </ul>
    </div>
  },
})

module.exports = Hello
