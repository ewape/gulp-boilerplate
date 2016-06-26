### Installation 
```sh
$ npm install
```

##### Installing npm dependencies:
```sh
$ npm install <dependency-name> --save-dev
```
##### Installing bower dependencies:
```sh
$ bower install <dependency-name> --save
```
### Tasks:
Default task is watch. 
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

#####Process all files from ./src directory:
```sh
$ gulp build
```

#####Process scss files:
```sh
$ gulp styles
```

#####Process js files:
```sh
$ gulp scripts
```

#####Optimize images:
```sh
$ gulp images
```

#####Copy main bower dependencies minified files to ./src/vendor directory:
```sh
$ gulp bower-copy-min
```
