speech-of-life
=============

Speech recognition enabled game of life.

Make sure you load the files through a web server, because chrome
won't let local javascript access the speech recognition api.


Building
--------

Install [Node.JS and NPM](http://nodejs.org/download/)

Install [Webpack](http://webpack.github.io/)

    npm install -g webpack

Install local dependencies

    npm install

Build the project and watch for changes

    webpack -w

Running
-------

```bash
npm install -g serve
npm serve .
```
Open [localhost:3000](http://localhost:3000)


Technologies
------------

[React](http://facebook.github.io/react/)
