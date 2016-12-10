var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    bowerNormalizer = require('gulp-bower-normalize'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    mainBowerFiles = require('main-bower-files'),
    notify = require('gulp-notify'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),

    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 1%', 'ie >= 11', 'android >= 4.4']
    },

    paths = {
        bower: "./bower_components/",
        lib: "./lib/",
        dist: "./dist/",
        src: "./src/"
    };

gulp.task('default', ['watch']);

gulp.task('build', ['concat-libs', 'html', 'styles', 'scripts', 'images']);
gulp.task('build-prod', ['concat-libs', 'html', 'styles-prod', 'scripts-prod', 'images']);

gulp.task('watch', function() {
    gulp.watch(paths.src + 'js/**/*.js', ['scripts']);
    gulp.watch(paths.lib + '**/*.js', ['concat-libs']);
    gulp.watch(paths.src + 'scss/**/*.scss', ['styles', 'csslint']);
    gulp.watch(paths.src + 'images/**/*.{jpg,jpeg,png,gif,svg}', ['images']);
    gulp.watch(paths.src + 'html/**/*.html', ['html']);
    livereload.listen();
    gulp.watch([paths.dist + '**', '*.html']).on('change', livereload.changed);
});

gulp.task('clean-lib', function() {
    return del.sync(paths.lib + '/*');
});

gulp.task('html', function() {
    return gulp.src([paths.src + 'html/*.html'])
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
    return gulp.src(paths.src + 'scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist + 'css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('styles-prod', function() {
    return gulp.src(paths.src + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('csslint', ['styles'], function() {
    return gulp.src(paths.dist + 'css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(notify({
            message: 'CSS lint task complete'
        }));
});

gulp.task('scripts', function() {
    return gulp.src(paths.src + 'js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('scripts-prod', function() {
    return gulp.src(paths.src + 'js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'js'))
        .pipe(notify({
            message: 'Scripts production task complete'
        }));
});

// Concat js dependencies into one file
gulp.task('concat-libs', ['bower'], function() {
    return gulp.src([
            //paths.lib + 'jquery/js/jquery.min.js',
            paths.src + 'js/vendors/custom-vendor.js'
        ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('images', function() {
    return gulp.src(paths.src + 'images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(cache(imagemin({
            progressive: true,
            verbose: true,
            use: [
                pngquant({
                    verbose: true,
                    speed: 10,
                    quality: "65-80"
                }),
                imagemin.gifsicle(),
                imagemin.jpegtran({
                    progressive: true
                }),
                imagemin.svgo()
            ]
        })))
        .pipe(gulp.dest(paths.dist + 'images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// Manage Bower dependencies

gulp.task('bower-files', ['clean-lib'], function() {
    return gulp.src(mainBowerFiles(), {
            base: paths.bower
        })
        .pipe(bowerNormalizer({
            bowerJson: './bower.json'
        }))
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

gulp.task('minify-bower-css', ['bower-files'], function() {
    return gulp.src(paths.lib + '**/*.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.lib));
});

gulp.task('bower', ['minify-bower-js', 'minify-bower-css']);