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

gulp.task('resources', function () {
	return gulp.src('./src/resources/**/*')
		.on('error', handleError)
		.pipe(gulp.dest('./web'))
		.pipe(browserSync.reload({stream: true}))
		;
});

gulp.task('default', ['resources', 'templates', 'server'], function () {

	watch('./src/resources/**', function () {
		gulp.run('resources');
	});

	watch('./src/templates/**', function () {
		gulp.run('templates');
	});

	watch('./src/app/config/**', function () {
		gulp.run('templates');
	});

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