var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var csswring = require( 'csswring' );
var kss = require( 'gulp-kss-styleguide' );
var cssnext = require( 'gulp-cssnext' );
var del = require( 'del' )
var browserSync = require( 'browser-sync' );

gulp.task( 'clean-dist', function( cb ) {
	del( [
		'styleguides/dist/css/**',
		'styleguides/dist/index.html'
	], cb );
});

gulp.task( 'copy-oculus-css', function () {
	return gulp.src( 'boilerplate/css/*' )
		.pipe( cssnext() )
		.pipe( postcss( [ postcssNested, csswring ] ) )
		.pipe( gulp.dest( 'styleguides/dist/css' ) );
});

gulp.task( 'styleguide', function(){
	return gulp.src( 'styleguides/src/css/**/*.css' )
		.pipe( kss({
			template: 'boilerplate/templates/index.html'
		}))
		.pipe( gulp.dest( 'styleguides/dist' ) );
});

gulp.task( 'css', function(){
	return gulp.src( 'styleguides/src/css/_all.css' )
		.pipe( cssnext() )
		.pipe( postcss( [ postcssNested, csswring ] ) )
		.pipe( gulp.dest( 'styleguides/dist/css' ) );
});

gulp.task( 'serve', function() {
	browserSync({
		server: {
			baseDir: 'styleguides/dist'
		}
	});
});

gulp.task( 'watch', function(){
	gulp.watch( 'styleguides/src/css/**/*', [ 'styleguide', 'css' ] );
	gulp.watch( [ 'boilerplate/**/*', 'styleguides/dist/**/*' ], browserSync.reload );
});

gulp.task( 'default', [ 'clean-dist', 'copy-oculus-css', 'styleguide', 'css', 'serve', 'watch' ] );
