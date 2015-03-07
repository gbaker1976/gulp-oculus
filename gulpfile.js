var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var kss = require( 'grunt-kss' );
var cssnext = require( 'gulp-cssnext' );
var path = require( 'path' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task(
	'clean-dist',
	function( cb ) {
		wrench.rmdirSyncRecursive( './styleguides/dist' );
		fs.mkdir( './styleguides/dist', cb );
	}
);

gulp.task( 'css', function(){
	return gulp.src( './styleguides/src/css/_all.css' )
	.pipe( cssnext({
		compress: false
	}))
	.pipe( postcss( [ postcssNested ] ) )
	.pipe( kss() )
	.pipe( gulp.dest( './styleguides/dist/css' ) )
});

gulp.task( 'serve', function() {
	browserSync({
		server: {
			baseDir: 'styleguides/dist',
			files: [ 'styleguides/dist/**/*.html', 'styleguides/dist/**/*.css' ]
		}
	});
});
