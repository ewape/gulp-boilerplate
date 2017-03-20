var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    bowerNormalizer = require('gulp-bower-normalize'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
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
    svgSprite = require('gulp-svg-sprite'),
    uglify = require('gulp-uglify'),

    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 1%', 'ie >= 11', 'android >= 4.4']
    },

    paths = {
        bower: "./bower_components/",
        lib: "./lib/",
        dist: "./dist/",
        src: "./src/",
        build: "./build/"
    },

    svgConfig = {
        dest: '.',
        mode: {
            symbol: { // symbol mode to build the SVG
                inline: true,
                sprite: '../../' + paths.src + 'html/templates/sprite.svg.html',
                example: true
            },
            css: {
                sprite: '../../' + paths.dist + 'images/svg/sprite.svg',
                render: {
                    css: false,
                    scss: {
                        dest: '../../' + paths.src + 'scss/_sprite.scss'
                    }
                }
            },
        },
        shape: {
            dimension: { // Set maximum dimensions
                maxWidth: 240,
                maxHeight: 240
            },
            spacing: { // Add padding
                padding: 0
            },
            dest: 'images/svg', // Keep the intermediate files
        },
        svg: { // General options for created SVG files
            xmlDeclaration: false, // Add XML declaration to SVG sprite
            doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
        namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
            namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
            dimensionAttributes: true // Width and height attributes on the sprite
        }
    };


gulp.task('default', ['watch']);
gulp.task('bower', ['minify-bower-js', 'minify-bower-css']);
gulp.task('build', ['images', 'styles', 'scripts', 'html']);
gulp.task('clean', ['clean-folders']);

gulp.task('watch', function() {
    gulp.watch(paths.src + 'js/**/*.js', ['scripts']);
    gulp.watch(paths.src + 'scss/**/*.scss', ['styles']);
    gulp.watch(paths.src + 'images/**/*.{jpg,jpeg,png,gif,svg}', ['images']);
    gulp.watch(paths.src + 'html/**/*.html', ['html']);
    livereload.listen();
    gulp.watch([paths.dist + '**', '*.html']).on('change', livereload.changed);
});

gulp.task('clean-folders', function() {
    return del.sync([paths.dist, paths.build, paths.lib]);
});

gulp.task('html', ['svg-sprite'], function() {
    return gulp.src([paths.src + 'html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('vendors-css', function() {
    return gulp.src([
            paths.lib + 'pagePiling.js/css/jquery.pagepiling.css'
        ])
        .pipe(concat('vendors.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('sass', function() {
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
        .pipe(gulp.dest(paths.build + 'css'));
});

gulp.task('styles', ['svg-sprite', 'vendors-css', 'sass'], function() {
    return gulp.src([paths.build + 'css/vendors.min.css', paths.build + 'css/app.min.css'])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(paths.dist + 'css'))
        .pipe(notify({
            message: 'Styles ready'
        }));
});

gulp.task('vendors-js', function() {
    return gulp.src([
            paths.lib + 'jquery/js/jquery.js',
            paths.lib + 'pagePiling.js/js/jquery.pagepiling.min.js',
            paths.lib + 'svg.js/js/svg.js',
            paths.src + 'js/vendors/cookies.js'
        ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('minify-scripts', function() {
    return gulp.src([paths.src + 'js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(babel({
            plugins: ['transform-runtime']
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('scripts', ['vendors-js', 'minify-scripts'], function() {
    return gulp.src([paths.build + 'js/vendors.min.js', paths.build + 'js/app.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.dist + 'js'))
        .pipe(notify({
            message: 'Scripts ready'
        }));
});

gulp.task('images', function() {
    return gulp.src(paths.src + 'images/**/*.{jpg,jpeg,png,gif}')
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
                })
            ]
        })))
        .pipe(gulp.dest(paths.dist + 'images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('svg-sprite', function() {
    return gulp.src(paths.src + 'images/svg/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('bower-files', function() {
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
        .pipe(gulp.dest(paths.lib));
});

gulp.task('minify-bower-css', ['bower-files'], function() {
    return gulp.src(paths.lib + '**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest(paths.lib));
});