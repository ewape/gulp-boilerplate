[![Build Status](https://travis-ci.org/ewape/gulp-boilerplate.svg?branch=nunjucks)](https://travis-ci.org/ewape/gulp-boilerplate)
[![Code Climate](https://codeclimate.com/github/ewape/gulp-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/ewape/gulp-boilerplate)
[![devDependency Status](https://img.shields.io/david/dev/ewape/gulp-boilerplate.svg)](https://david-dm.org/ewape/gulp-boilerplate?type=dev)

### Downloading
Clone github repository:
```sh
$ git clone https://github.com/ewape/gulp-boilerplate.git
```

### Installation
After downloading this repository use following commands inside main directory to build local version of a project:
```sh
$ npm i
$ gulp build
```

### Utilities

#### Watch file changes
Default task is equal to watch.
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

#### Svg sprite
Default configuration generates svg «symbol» mode sprite along with usage example in ./docs directory.  
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

#### Fonts
Download Google webfonts and update @font-face declarations in ./src/scss/modules/_fonts.scss file:
```sh
$ gulp fonts
```

#### HTML validation:
```sh
$ gulp w3cjs
```

#### Rebuilding project files:
```sh
$ gulp clean
$ gulp build
```

#### Templating:
Nunjucks [documentation](https://mozilla.github.io/nunjucks/templating.html)  

[Nunjucks syntax support for Sublime Text](https://github.com/mogga/sublime-nunjucks/blob/master/Nunjucks.tmLanguage)

### Configuration
config.json: 
- data: variables available in nunjucks templates, including Open Graph protocol settings
- faviconImage: favicon image path
- fontOptions: font related directory paths
- autoprefixerOptions: Autoprefixer options
- paths: project directory structure

bower.json:
- overrides: overrides defaults from dependency package bower.json. Here you can explicitly set what files will be included in ./lib directory by $ gulp bower task.

font.list
- use [Google Web Fons syntax](https://developers.google.com/fonts/docs/getting_started#specifying_font_families_and_styles_in_a_stylesheet_url) to set fonts available in project.  
This file is used by [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) to download fonts .woff files and create scss file containing @font-face declarations.

### Adding dependencies

#### Installing npm dependencies:
```sh
$ npm i <dependency-name> -D
```
#### Installing bower dependencies:
```sh
$ bower install <dependency-name> --save
```

