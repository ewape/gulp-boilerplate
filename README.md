## Installation 
```sh
$ npm install
```

## Installing npm modules:
```sh
$ npm install <module-name> --save-dev
```
## Installing dependencies with bower:
```sh
$ bower install <dependency-name> --save
```
## Tasks:
Default task is watch. 
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

Compile all files to dist directory:
```sh
$ gulp build
```

Process scss files:
```sh
$ gulp styles
```

Process js files:
```sh
$ gulp scripts
```

Minify images:
```sh
$ gulp images
```

Copy main bower dependencies minified files to ./src/vendor/ directory:
```sh
$ gulp bower-copy-min
```
