var gulp = require('gulp'),
    exists = require('path-exists').sync,
    autoprefixer = require('gulp-autoprefixer'),
    bowerNormalizer = require('gulp-bower-normalize'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint');
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    mainBowerFiles = require('main-bower-files'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var autoprefixerOptions = {
    browsers: ['last 2 versions', 'ie >= 10', 'android >= 4.4']
};

var paths = {
    bower: "./bower_components/",
    lib: "./lib/",
    dist: "./dist/"
};

gulp.task('default', ['watch']);
gulp.task('build', ['clean-dist', 'html', 'styles-prod', 'scripts-prod', 'images', 'minify-bower-css']);
gulp.task('build-dev', ['clean-dist', 'html', 'styles', 'scripts', 'images', 'minify-bower-css']);

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/scss/**/*.scss', ['styles', 'csslint']);
    gulp.watch('./src/images/**/*.{jpg,jpeg,png,gif,svg}', ['images']);
    gulp.watch('./src/html/**/*.html', ['html']);
    gulp.watch('./bower_components/**/*', ['minify-bower-css']);
    livereload.listen();
    gulp.watch(['./dist/**', '*.html']).on('change', livereload.changed);
});

gulp.task('clean-lib', function() {
    return del(paths.lib);
});

gulp.task('clean-dist', function() {
    return del([paths.dist + 'css', paths.dist + 'js']);
});

gulp.task('html', function() {
  return gulp.src(['./src/html/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
        context: {
            jquery: false
        }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('styles-prod', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('csslint', ['styles'], function() {
    return gulp.src('./dist/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(notify({
            message: 'CSS lint task complete'
        }));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('scripts-prod', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify({
            message: 'Scripts production task complete'
        }));
});

gulp.task('images', function() {
    return gulp.src('./src/images/**/*.{jpg,jpeg,png,gif,svg}')
         .pipe(cache(imagemin({
            progressive: true,
            verbose: true,
            use: [
                imagemin.optipng({optimizationLevel: 4}),
                imagemin.gifsicle(),
                imagemin.jpegtran({progressive: true}),
                imagemin.svgo()
            ]
         })))
        .pipe(gulp.dest('./dist/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// Manage Bower dependencies

gulp.task('bower-files', ['clean-lib'],  function() {
    return gulp.src(mainBowerFiles(), { base: paths.bower })
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest(paths.lib));
});

gulp.task('minify-bower-js', ['bower-files'], function() {
    return gulp.src(paths.lib + '**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.lib));
});

gulp.task('minify-bower-css', ['minify-bower-js'], function() {
    return gulp.src(paths.lib + '**/*.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.lib));
});