### Project setup
```sh
$ npm install
$ gulp bower
$ gulp build
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
Default task is equal to watch.
LiveReload feature requires <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei" target="_blank">ChromeLiveReload extension</a> or other setup.
```sh
$ gulp
$ gulp watch
```

#####Optimize resources by type:
```sh
$ gulp styles
$ gulp scripts
$ gulp images
```

#####Clean build files:
```sh
$ gulp clean
```
