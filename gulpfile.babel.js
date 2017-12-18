const gulp = require('gulp'),
    fs = require('fs'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    config = require('./config/config'),
    del = require('del'),
    googleWebFonts = require('gulp-google-webfonts'),
    imagemin = require('gulp-imagemin'),
    imageminGuetzli = require('imagemin-guetzli'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    nunjucks = require('gulp-nunjucks-render'),
    pngquant = require('imagemin-pngquant'),
    realFavicon = require('gulp-real-favicon'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svgSprite = require('gulp-svg-sprite'),
    uglify = require('gulp-uglify'),
    w3cjs = require('gulp-w3cjs'),

    paths = config.paths,
    autoprefixerOptions = config.css.autoprefixerOptions,

    faviconConfig = require('./config/favicon').faviconConfig,
    faviconDataFile = faviconConfig.markupFile,

    imgConfig = require('./config/images'),
    imageminOptions = imgConfig.imageminOptions,
    svgConfig = imgConfig.svgConfig;

gulp.task('default', ['watch']);
gulp.task('build', ['styles', 'scripts', 'html', 'images', 'copy']);
gulp.task('clean', ['clean-folders']);
gulp.task('favicon', ['inject-favicon-markups']);

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(paths.src + 'js/**/*.js', ['scripts:watch']);
    gulp.watch(paths.src + 'scss/**/*.scss', ['styles']);
    gulp.watch(paths.src + 'images/**/*.{jpg,jpeg,png,gif,svg,ico}', ['images']);
    gulp.watch(paths.src + 'html/**/*.+(html|njk)', ['html']);
    gulp.watch(["*.html", paths.dist + 'js/*.js']).on('change', browserSync.reload);
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean-folders', () => del.sync([paths.dist, paths.temp]));

gulp.task('html', () => {
    gulp.src([paths.src + 'html/pages/**/*.+(html|njk)'])
        .pipe(nunjucks({
            data: config.data,
            path: [paths.src + 'html/templates']
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('styles', () => {
    gulp.src(paths.src + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', notify.onError({
            message: '<%= error.message %>',
            sound: false
        })))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'css'))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

gulp.task('vendors-js', () => {
    gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/scrollmonitor/scrollMonitor.js',
            'node_modules/autosize/dist/autosize.min.js',
            'node_modules/parsleyjs/dist/parsley.min.js',
            'node_modules/lazysizes/lazysizes.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.temp + 'js'));
});

gulp.task('minify-scripts', () => {
    gulp.src([
            paths.src + 'js/vendors/*.js',
            paths.src + 'js/app.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish')).on('error', notify.onError({
            message: '<%= error.message %>',
            sound: false
        }))
        .pipe(babel()).on('error', notify.onError({
            message: '<%= error.message %>',
            sound: false
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.temp + 'js'));
});

gulp.task('scripts', ['vendors-js', 'minify-scripts'], () => {
    gulp.src([paths.temp + 'js/libs.js', paths.temp + 'js/main.js'])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('scripts:watch', ['minify-scripts'], () => {
    gulp.src([paths.temp + 'js/libs.js', paths.temp + 'js/main.js'])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('images', () => {
    gulp.src([paths.src + 'images/**/*.{jpg,jpeg,png,gif,ico,svg}'])
        .pipe(cache(imagemin(imageminOptions)))
        .pipe(gulp.dest(paths.dist + 'images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    gulp.src(config.fontList)
        .pipe(googleWebFonts(paths.font))
        .pipe(gulp.dest(paths.src + 'fonts'));
});

gulp.task('copy', () => {
    gulp.src(paths.src + 'fonts/*')
        .pipe(gulp.dest(paths.dist + 'fonts'));
    gulp.src(paths.src + 'favicon/*')
        .pipe(cache(imagemin(imageminOptions)))
        .pipe(gulp.dest(paths.dist + 'favicon'));
});

gulp.task('svg-sprite', () => {
    gulp.src(paths.src + 'images/icons/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest(paths.dist));
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon-images', (done) => realFavicon.generateFavicon(faviconConfig, () => done()));

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', ['generate-favicon-images'], () => {
    gulp.src([paths.src + 'html/templates/partials/favicon.njk'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code))
        .pipe(gulp.dest(paths.src + 'html/templates/partials/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', () => {
    let currentVersion = JSON.parse(fs.readFileSync(faviconDataFile)).version;
    realFavicon.checkForUpdates(currentVersion, (err) => {
        if (err) {
            console.log('\x1b[31m', 'To update favicon run: \n gulp favicon && gulp build');
        }
    });
});

gulp.task('w3c', () => {
    gulp.src('./*.html')
        .pipe(w3cjs({
            verifyMessage: function(type, message) {
                // add exception for lazyload images
                if (message.indexOf('Element “img” is missing required attribute “src”') === 0) {
                    return false;
                }
                // allow message to pass through
                return true;
            }
        }))
        .pipe(w3cjs.reporter());
});