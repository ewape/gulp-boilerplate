### Setup
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
### Tasks
Default task is watch. 
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

#####Compile production files:
```sh
$ gulp build
```

#####Optimize resources by type:
```sh
$ gulp styles
$ gulp scripts
$ gulp images
```

#####Copy minified bower dependencies into ./dist/vendor:
```sh
$ gulp bower-copy-min
```
