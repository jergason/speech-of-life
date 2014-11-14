// run webpack and live reload

var webpack = require('webpack');
var config = require('../webpack.config');
var livereload = require('gulp-livereload');

webpack(config).watch(200, function (err, stats) {
  livereload.changed();
});
