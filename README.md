# Very basic starter site...

**[Nathan Crenshaw](mailto:crenshan@gmail.com)**

This is a very basic starter site meant for rapid protoyping using [Grunt](http://gruntjs.com/) and [Compass](http://compass-style.org/).

-------------------------------

## After downloading, be sure to load all dependencies:

    npm install

## Structure

### dev /
This is the development directory containing all source files. All updates to HTML, JS, SCSS, and image files should be made in this directory.

### build /
This directory will be created on the first `grunt` task and contains all of the compiled files. If you are deploying to a server, this folder contains everything you need.

## Build Tasks

### Compile and/or Copy Files from "Dev" to "Build"

    grunt

- Compile Compass
- Minify JavaScript
- Copy Vendor Javascript
- Update Images
- Compile HTML with includes

### Compile and Start Dev Server

    grunt start

- Compile Compass
- Minify JavaScript
- Copy Vendor Javascript
- Update Images
- Compile HTML with includes
- Watch HTML, CSS, JS and image files (in "Dev") for changes
- Start LiveReload on [http://localhost:9001](http://localhost:9001)

## Grunt Tools

- [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload)
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-regarde](https://github.com/yeoman/grunt-regarde)
- [grunt-replace](https://github.com/outaTiME/grunt-replace)












