var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var fs = require('fs');
var data = require('gulp-data');

var handlebars = require('gulp-compile-handlebars');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('server', function () {
	browserSync({
		server: {
			baseDir: "./web"
		}
	});
});

//gulp.task('browserify', function () {
//	return browserify('./src/js/app.js')
//		.bundle()
//		//Pass desired output filename to vinyl-source-stream
//		.pipe(source('pictawall.js'))
//		// Start piping stream to tasks!
//		.pipe(gulp.dest('./web/lib/js'))
//		.pipe(browserSync.reload({stream: true}));
//});

gulp.task('templates', function () {
	nunjucksRender.nunjucks.configure(['./src/templates/']);
	return gulp.src('./src/templates/*.nj')
		.pipe(data(getDataForFile))
		.pipe(nunjucksRender())
		.on('error', handleError)
		.pipe(rename({extname: ''}))
		.pipe(gulp.dest('./web'))
		.pipe(browserSync.reload({stream: true}))
		;
});

gulp.task('static', function () {
	return gulp.src('./src/static/**/*')
		.on('error', handleError)
		.pipe(gulp.dest('./web'))
		.pipe(browserSync.reload({stream: true}))
		;
});

gulp.task('default', ['static', 'templates', 'server'], function () {

	gulp.watch('./src/static/**', ['static']);
	gulp.watch('./src/templates/**', ['templates']);
	gulp.watch('./src/app/config/**', ['templates']);

	//gulp.src('./web').pipe(watch('src/js/**/*.*', function () {
	//	gulp.run('browserify');
	//}));

});

/**
 * Function for handing error
 */
function handleError(error) {
	console.error(error);
	browserSync.notify('<span style="color: red">' + error + '</span>', 3600 * 1000);
	this.emit('end');
}

function getDataForFile(file){
	var config = JSON.parse(fs.readFileSync('./src/app/config/parameters.json'));

	return {
		app: {
			config: config
		},
		file: file.relative
	};
}