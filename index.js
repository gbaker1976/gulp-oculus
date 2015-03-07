var kss = require( 'kss' );
var server = require( 'browser-sync' );

server({
	server: "styleguides/dist",
	files: ["styleguides/dist/**/*.html", "styleguides/dist/**/*.css"]
});
