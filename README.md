### Project setup
```sh
$ npm install
$ gulp bower
$ gulp build
```

##### Installing npm dependencies:
```sh
$ npm install <dependency-name> -D
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

##### Generate svg sprite:
```sh
$ gulp svg-sprite
```

##### Generate favicon:
```sh
$ gulp favicon
```

##### Clean build files:
```sh
$ gulp clean
```
