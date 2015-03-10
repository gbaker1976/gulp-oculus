var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var csswring = require( 'csswring' );
var kss = require( 'gulp-kss-styleguide' );
var cssnext = require( 'gulp-cssnext' );
var path = require( 'path' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task(
	'clean-dist',
	function( cb ) {
		fs.exists( __dirname + '/styleguides/dist', function( exists ){
			if ( exists ) {
				wrench.rmdirSyncRecursive( __dirname + '/styleguides/dist' );
			}
			fs.mkdir( __dirname + '/styleguides/dist', cb );
		});
	}
);

gulp.task(
	'copy-oculus-css',
	function ( cb ) {
		wrench.copyDirRecursive(
			__dirname + '/boilerplate/css',
			__dirname + '/styleguides/dist/css',
			{ forceDelete: true },
			cb
		);
	}
);

gulp.task( 'styleguide', function(){
	return gulp.src( __dirname + '/styleguides/src/**/*.css' )
		.pipe( kss({
			template: __dirname + '/boilerplate/templates/index.html'
		}))
		.pipe( gulp.dest( __dirname + '/styleguides/dist' ) );
});

gulp.task( 'css', function(){
	return gulp.src( __dirname + '/styleguides/src/*/css/_all.css' )
		.pipe( cssnext({
			compress: false
		}))
		.pipe( postcss( [ postcssNested, csswring ] ) )
		.pipe( gulp.dest( __dirname + '/styleguides/dist' ) );
});

gulp.task( 'serve', function() {
	browserSync({
		server: {
			baseDir: __dirname + '/styleguides/dist',
			files: [ __dirname + '/styleguides/dist/**/*.html', __dirname + '/styleguides/dist/**/*.css' ]
		}
	});
});

gulp.task( 'default', [ 'clean-dist', 'copy-oculus-css', 'styleguide', 'css', 'serve' ] );
