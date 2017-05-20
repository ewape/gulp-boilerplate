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
  - [Options](#options)
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

#### Installing npm dependencies
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


## Options

- `autoprefixerOptions` Autoprefixer options
- `faviconConfig` favicon image settings
- `imageminOptions` image compression using Imagemin
- `svgConfig` svg sprite settings

config.json  
- `data` variables available in nunjucks templates, including [Open Graph](http://ogp.me/) protocol settings
- `fontOptions` font related directory paths
- `paths` project directory structure


font.list  
This file is used by [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) to download .woff files from [Google Fonts](https://fonts.google.com/) and update @font-face declarations in ./src/scss/modules/_fonts.scss.  
Supported formats:

    
      # Tab-delimeted format
      Oswald  400,700 latin,latin-ext

      # Google format
      Roboto:300,400,700&subset=latin-ext
      Lato:300,400,700&subset=latin-ext


### Options by type

Usage			  | Variable			| File		
---			  | ---				| ---			
Sprite		  	  | `svgConfig`	    		| [gulpfile.babel.js](https://github.com/ewape/gulp-boilerplate/blob/master/gulpfile.babel.js#L33)		
Favicon		    	  | `faviconConfig`		| [gulpfile.babel.js](https://github.com/ewape/gulp-boilerplate/blob/master/gulpfile.babel.js#L60)
&nbsp;      		  | `faviconImage`  		| [config.json](https://github.com/ewape/gulp-boilerplate/blob/master/config.json#L17)	
Fonts       		  | `fontOptions`		| [config.json](https://github.com/ewape/gulp-boilerplate/blob/master/config.json#L18)
&nbsp;       		  |  - 		    		| [font.list](https://github.com/ewape/gulp-boilerplate/blob/master/fonts.list)	
Templating   		  | `data`			| [config.json](https://github.com/ewape/gulp-boilerplate/blob/master/config.json#L2)
CSS prefixes   	  | `autoprefixerOptions`	| [config.json](https://github.com/ewape/gulp-boilerplate/blob/master/config.json#L23)
Project directories    	  | `paths`			| [config.json](https://github.com/ewape/gulp-boilerplate/blob/master/config.json#L26)

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)
