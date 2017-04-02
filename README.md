### Status:
[![Build Status](https://travis-ci.org/ewape/gulp-boilerplate.svg?branch=nunjucks)](https://travis-ci.org/ewape/gulp-boilerplate)
[![Code Climate](https://codeclimate.com/github/ewape/gulp-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/ewape/gulp-boilerplate)
[![devDependency Status](https://img.shields.io/david/dev/ewape/gulp-boilerplate.svg)](https://david-dm.org/ewape/gulp-boilerplate?type=dev)

## Installation
```sh
$ git clone https://github.com/ewape/gulp-boilerplate.git
```

### Project setup
Inside project folder use commands:
```sh
$ npm i
$ gulp build
```

### Utilities
Default task is equal to watch.
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

#### Svg sprite
Default configuration generates svg <symbol> sprite along with usage example in ./docs directory.  
Svg-sprite documentation: (https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md)  
Online configuration kickstarter for gulp: (http://jkphl.github.io/svg-sprite/#gulp)  

```sh
$ gulp svg-sprite
```

#### Favicon
Favicon files are generated with [gulp-real-favicon](https://github.com/RealFaviconGenerator/gulp-real-favicon). Vector images are supported as source file.

```sh
$ gulp favicon
```

##### Download Google webfonts and generate a stylesheet:
```sh
$ gulp fonts
```

##### Validate HTML:
```sh
$ gulp w3cjs
```

##### Rebuild project files:
```sh
$ gulp clean
$ gulp build
```

##### Nunjucks templating engine:
<a href="https://mozilla.github.io/nunjucks/templating.html" target="_blank">Docs</a><br>
<a href="https://github.com/mogga/sublime-nunjucks/blob/master/Nunjucks.tmLanguage" target="_blank">Syntax support for Sublime Text</a>


### Adding dependencies

##### Installing npm dependencies:
```sh
$ npm i <dependency-name> -D
```
##### Installing bower dependencies:
```sh
$ bower install <dependency-name> --save
```

