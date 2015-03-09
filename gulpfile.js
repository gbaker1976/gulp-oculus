var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var kss = require( 'gulp-kss' );
var cssnext = require( 'gulp-cssnext' );
var path = require( 'path' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task(
	'clean-dist',
	function( cb ) {
		wrench.rmdirSyncRecursive( 'styleguides/dist' );
		fs.mkdir( 'styleguides/dist', cb );
	}
);

gulp.task( 'styleguide', function(){
	return gulp.src( 'styleguides/src/**/*.css' )
		.pipe( kss({
			templateDirectory: 'boilerplate/templates'
		}))
		.pipe( gulp.dest( 'styleguides/dist' ) );
});

gulp.task( 'css', function(){
	return gulp.src( 'styleguides/src/*/css/_all.css' )
		.pipe( cssnext({
			compress: false
		}))
		.pipe( postcss( [ postcssNested ] ) )
		.pipe( gulp.dest( 'styleguides/dist' ) );
});

gulp.task( 'serve', function() {
	browserSync({
		server: {
			baseDir: 'styleguides/dist',
			files: [ 'styleguides/dist/**/*.html', 'styleguides/dist/**/*.css' ]
		}
	});
});

gulp.task( 'default', [ 'clean-dist', 'styleguide', 'css', 'serve' ] );
