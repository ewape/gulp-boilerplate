[![Build Status](https://travis-ci.org/ewape/gulp-boilerplate.svg?branch=nunjucks)](https://travis-ci.org/ewape/gulp-boilerplate)
[![Code Climate](https://codeclimate.com/github/ewape/gulp-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/ewape/gulp-boilerplate)
[![devDependency Status](https://img.shields.io/david/dev/ewape/gulp-boilerplate.svg)](https://david-dm.org/ewape/gulp-boilerplate?type=dev)

# Gulp boilerplate

  - [Getting started](#getting-started)
    - [Downloading](#downloading)
    - [Setup](#setup)
  - [Usage](#usage)
    - [Watch file changes](#watch-file-changes)
    - [Svg sprite](#svg-sprite)
    - [Favicon](#favicon)
    - [Fonts](#fonts)
    - [HTML validation](#html-validation)
    - [Rebuilding project files](#rebuilding-project-files)
    - [Templating](#templating)
    - [Adding dependencies](#adding-dependencies)
  - [Options](#options)
  - [License](#license)


## Getting started

### Downloading
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

### Watch file changes
Default task is equal to watch.
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
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
Options are defined in gulpfile.babel.js under faviconConfig variable. This setup uses faviconDataFile.json to generate HTML markup in ./src/html/templates/partials/favicon.nunjucks file.  
Input image supported formats: .png, .jpg, .svg.

### Fonts
```sh
$ gulp fonts
```
Downloads Google webfonts and updates @font-face declarations in ./src/scss/modules/_fonts.scss.

### HTML validation
```sh
$ gulp w3cjs
```

### Rebuilding project files
```sh
$ gulp clean
$ gulp build
```

### Templating
This project uses Mozilla's [Nunjucks templating](https://mozilla.github.io/nunjucks/templating.html).  
To add Nunjucks syntax definition to Sublime Text 3 save contents of [this file](https://raw.githubusercontent.com/mogga/sublime-nunjucks/master/Nunjucks.tmLanguage) as Nunjucks.tmLanguage in Sublime Text 3/Packages/Nunjucks Syntax directory.

### Adding dependencies

#### Installing npm dependencies
```sh
$ npm i <dependency-name> -D
```
#### Installing Bower dependencies
```sh
$ bower install <dependency-name> --save
```


## Options


gulpfile.babel.js:
- `svgConfig` svg sprite settings
- `faviconConfig` favicon images settings

config.json: 
- `data` variables available in nunjucks templates, including [Open Graph](http://ogp.me/) protocol settings
- `faviconImage` favicon image path
- `fontOptions` font related directory paths
- `autoprefixerOptions` Autoprefixer options
- `paths` project directory structure

bower.json:
- `overrides` overrides defaults from dependency package bower.json. Here you can explicitly set what files will be included in ./lib directory by $ gulp bower task.

font.list
- use [Google Web Fons syntax](https://developers.google.com/fonts/docs/getting_started#specifying_font_families_and_styles_in_a_stylesheet_url) to set fonts available in project.  
This file is used by [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) to download font files and create scss file containing @font-face declarations.


### Options by type

Usage			  | Variable			| File		
---			  | ---				| ---			
Sprite		  	  | `svgConfig`	    		| *gulpfile.babel.js*		
Favicon		    	  | `faviconConfig`		| *gulpfile.babel.js*	
&nbsp;      		  | `faviconImage`  		| *config.json*	
Fonts       		  | `fontOptions`		| *config.json*
&nbsp;       		  |  - 		    		| *font.list*	
Templating   		  | `data`			| *config.json*	
Browser prefixes   	  | `autoprefixerOptions`	| *config.json*
Bower dependencies 	  | `overrides`			| *bower.json*
Directory tree    	  | `paths`			| *config.json*		

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ewape/gulp-boilerplate/blob/master/LICENSE.md) file for details.
