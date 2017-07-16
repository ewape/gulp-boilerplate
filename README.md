[![Build Status](https://travis-ci.org/ewape/gulp-boilerplate.svg?branch=master)](https://travis-ci.org/ewape/gulp-boilerplate)
[![Code Climate](https://codeclimate.com/github/ewape/gulp-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/ewape/gulp-boilerplate)
[![dependencies Status](https://david-dm.org/ewape/gulp-boilerplate/status.svg)](https://david-dm.org/ewape/gulp-boilerplate)
[![devDependency Status](https://img.shields.io/david/dev/ewape/gulp-boilerplate.svg)](https://david-dm.org/ewape/gulp-boilerplate?type=dev)
[![bitHound Overall Score](https://www.bithound.io/github/ewape/gulp-boilerplate/badges/score.svg)](https://www.bithound.io/github/ewape/gulp-boilerplate)

# Gulp boilerplate

  - [Getting started](#getting-started)
    - [Download](#download)
    - [Setup](#setup)
  - [Usage](#usage)
    - [Hot reloading](#hot-reloading)
    - [Svg sprite](#svg-sprite)
    - [Favicon](#favicon)
    - [Fonts](#fonts)
    - [HTML validation](#html-validation)
    - [Templating](#templating)
    - [Dependencies](#dependencies)
    - [Rebuilding project files](#rebuilding-project-files)
  - [Configuration](#configuration)
  - [License](#license)


## Getting started

### Download
Clone github repository:
```sh
$ git clone https://github.com/ewape/gulp-boilerplate.git
```

### Setup
Use following commands inside main directory to build local version of a project:
```sh
$ npm i
$ gulp build
```

## Usage

### Hot reloading
Watching changes in files is handled by [Browsersync](https://github.com/Browsersync/browser-sync).
```sh
$ gulp watch
```

### Svg sprite
```sh
$ gulp svg-sprite
```
Default configuration generates svg «symbol» mode sprite template based on .svg files from ./src/images/icons directory along with usage example in ./docs.  
Svg-sprite documentation: https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md  
Online configuration kickstarter for gulp: http://jkphl.github.io/svg-sprite/#gulp  


### Favicon
```sh
$ gulp favicon
```
Favicon files are generated with [gulp-real-favicon](https://github.com/RealFaviconGenerator/gulp-real-favicon).  
Options are defined in gulpfile.babel.js under faviconConfig variable. This setup uses faviconDataFile.json to generate HTML markup in ./src/html/templates/partials/favicon.njk file.  
Input image supported formats: .png, .jpg, .svg.

### Fonts
```sh
$ gulp fonts
```
Downloads Google webfonts and updates @font-face declarations in ./src/scss/modules/_fonts.scss.

### HTML validation
```sh
$ gulp w3c
```

### Templating
This project uses Mozilla's [Nunjucks templating](https://mozilla.github.io/nunjucks/templating.html).  
To add Nunjucks syntax definition to Sublime Text 3 save contents of [this file](https://raw.githubusercontent.com/mogga/sublime-nunjucks/master/Nunjucks.tmLanguage) as Nunjucks.tmLanguage in Sublime Text 3/Packages/Nunjucks Syntax directory.

### Dependencies

#### Libraries included

- [jQuery](https://github.com/jquery/jquery)
- [normalize-scss](https://github.com/JohnAlbin/normalize-scss)
##### Lazy loading images
- [lazysizes](https://github.com/aFarkas/lazysizes)
##### Scroll detection
- [scrollMonitor](https://github.com/stutrek/scrollMonitor) detect element position in viewport
##### Forms
- [Parsley.js](https://github.com/guillaumepotier/Parsley.js/) - form validation
- [autosize](https://github.com/jackmoore/autosize) - textarea auto grow

#### Installing dependencies via npm
```sh
$ npm i <devDependency-name> -D
$ npm i <dependency-name> --save
```

### Rebuilding project files
After updating sprites, favicons, fonts and dependencies rebuild project:
```sh
$ gulp clean
$ gulp build
```


## Configuration


font.list  
This file is used by [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) to download .woff files from [Google Fonts](https://fonts.google.com/) and update @font-face declarations in ./src/scss/modules/_fonts.scss.  
Supported formats:

    
      # Tab-delimeted format
      Oswald  400,700 latin,latin-ext

      # Google format
      Roboto:300,400,700&subset=latin-ext
      Lato:300,400,700&subset=latin-ext


## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)
