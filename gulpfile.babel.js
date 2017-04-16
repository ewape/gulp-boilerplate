//require('babel-polyfill');

const gulp = require('gulp'),
	fs = require('fs'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	bowerNormalizer = require('gulp-bower-normalize'),
	browserify = require('browserify'),
	browserSync = require('browser-sync')
	.create(),
	cache = require('gulp-cache'),
	concat = require('gulp-concat'),
	config = require('./config.json'),
	del = require('del'),
	faviconDataFile = config.faviconDataFile,
	googleWebFonts = require('gulp-google-webfonts'),
	imagemin = require('gulp-imagemin'),
	imageminGuetzli = require('imagemin-guetzli'),
	jshint = require('gulp-jshint'),
	mainBowerFiles = require('main-bower-files'),
	notify = require('gulp-notify'),
	nunjucks = require('gulp-nunjucks-render'),
	pngquant = require('imagemin-pngquant'),
	realFavicon = require('gulp-real-favicon'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	svgSprite = require('gulp-svg-sprite'),
	uglify = require('gulp-uglify'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	webpackConfig = require('./webpack.config.js'),
	w3cjs = require('gulp-w3cjs'),

	paths = config.paths,
	autoprefixerOptions = config.autoprefixerOptions,

	fontOptions = config.fontOptions,

	svgConfig = {
		//log: 'debug', // info, verbose, debug
		dest: '.',
		mode: {
			symbol: {
				inline: true,
				sprite: '../../' + paths.src + 'html/templates/partials/symbol.njk',
				example: {
					dest: '../../' + paths.docs + 'symbol.html'
				}
			}
		},
		shape: {
			dimension: {
				maxWidth: 100,
				maxHeight: 100
			},
			id: {
				generator: 'icon-%s',
				whitespace: '-'
			},
			spacing: {
				padding: 0
			}
		}
	},

	faviconConfig = {
		masterPicture: config.faviconImage,
		dest: paths.src + 'favicon',
		iconsPath: config.data.url + 'dist/favicon/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '10%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#2d89ef',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: faviconDataFile
	};

gulp.task('default', ['watch']);
gulp.task('build', ['styles', 'scripts', 'html', 'images', 'copy']);
gulp.task('clean', ['clean-folders']);
gulp.task('copy', ['copy-fonts', 'copy-favicon']);
gulp.task('favicon', ['inject-favicon-markups']);

gulp.task('watch', ['browser-sync'], () => {
	gulp.watch(paths.src + 'js/**/*.js', ['scripts']);
	gulp.watch(paths.src + 'scss/**/*.scss', ['styles']);
	gulp.watch(paths.src + 'images/**/*.{jpg,jpeg,png,gif,svg,ico}', ['images']);
	gulp.watch(paths.src + 'html/**/*.+(html|njk)', ['html']);
	gulp.watch(["*.html", paths.dist + 'js/*.js'])
		.on('change', browserSync.reload);
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('clean-folders', () => del.sync([paths.dist, paths.build]));

gulp.task('html', () => {
	gulp.src([paths.src + 'html/pages/**/*.+(html|njk)'])
		.pipe(nunjucks({
			data: config.data,
			path: [paths.src + 'html/templates']
		}))
		.pipe(gulp.dest('./'))
		.pipe(notify({
			message: 'HTML ready'
		}));
});

gulp.task('styles', () => {
	gulp.src(paths.src + 'scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
				outputStyle: 'compressed'
			})
			.on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.dist + 'css'))
		.pipe(browserSync.stream({
			match: '**/*.css'
		}))
		.pipe(notify({
			message: 'Styles ready'
		}));
});

gulp.task('vendors-js', () => {
	gulp.src([
           // 'node_modules/jquery/dist/jquery.min.js'
        ])
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('minify-scripts', () => {
	return gulp.src([
            paths.src + 'js/**/*.js'
        ])
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(babel())
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.build + 'js'));
});

gulp.task('scripts', ['vendors-js', 'minify-scripts'], () => {
	gulp.src([paths.build + 'js/app.js'])
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('images', ['images-jpg'], () => {
	gulp.src([paths.src + 'images/**/*.{png,gif,ico,svg}'])
		.pipe(cache(imagemin({
			verbose: true,
			plugins: [
                pngquant({
					speed: 10,
					quality: "65-80"
				})
            ]
		})))
		.pipe(gulp.dest(paths.dist + 'images'))
		.pipe(browserSync.stream());
});

gulp.task('images-jpg', () => {
	gulp.src(paths.src + 'images/**/*.{jpg,jpeg}')
		.pipe(imagemin([imageminGuetzli()]))
		.pipe(cache(imagemin({
			verbose: true,
			plugins: [imagemin.jpegtran({
				progressive: true
			})]
		})))
		.pipe(gulp.dest(paths.dist + 'images'));
});

gulp.task('fonts', () => {
	gulp.src('./fonts.list')
		.pipe(googleWebFonts(fontOptions))
		.pipe(gulp.dest(paths.src + 'fonts'));
});

gulp.task('copy-fonts', () => {
	gulp.src([paths.src + 'fonts/*'])
		.pipe(gulp.dest(paths.dist + 'fonts'));
});

gulp.task('copy-favicon', () => {
	gulp.src([paths.src + 'favicon/*'])
		.pipe(cache(imagemin({
			verbose: true,
			plugins: [
                pngquant({
					speed: 10,
					quality: "65-80"
				})
            ]
		})))
		.pipe(gulp.dest(paths.dist + 'favicon'));
});

gulp.task('svg-sprite', () => {
	gulp.src(paths.src + 'images/icons/*.svg')
		.pipe(svgSprite(svgConfig))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('bower', () => {
	gulp.src(mainBowerFiles(), {
			base: paths.bower
		})
		.pipe(bowerNormalizer({
			bowerJson: './bower.json',
			checkPath: true
		}))
		.pipe(gulp.dest(paths.lib));
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
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile))
			.favicon.html_code))
		.pipe(gulp.dest(paths.src + 'html/templates/partials/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', () => {
	let currentVersion = JSON.parse(fs.readFileSync(faviconDataFile))
		.version;
	realFavicon.checkForUpdates(currentVersion, (err) => {
		if (err) {
			throw err;
		}
	});
});

gulp.task('w3c', () => {
	gulp.src('./*.html')
		.pipe(w3cjs())
		.pipe(w3cjs.reporter());
});