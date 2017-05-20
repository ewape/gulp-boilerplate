const browserSync = require('browser-sync');

browserSync({
	server: {
		baseDir: "./"
	},
	files: ["*.html", "dist/css/s*.css"]
});
