var kss = require( 'kss' );
var browserSync = require( 'browser-sync' );
var through = require( 'through' );
var files = [];

module.exports = function( opts ){
	opts = opts || {};

	// force markdown because it's cool.
	opts.markdown: false;

	// config server (if any)
	if ( opts.server ) {

	}

	return through( function( file, enc, cb ){
		if ( file.isNull() ) {
			cb( null, file );
			return;
		}

		if ( file.isStream() ) {
			cb( new Error( 'Streaming not supported' ));
			return;
		}

		files.push( file );

	}, function(){

	});

};
