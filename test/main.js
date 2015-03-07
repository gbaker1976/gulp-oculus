var section = require( './tester' ).section;
var assert = require( 'assert' );
var oculus = require( '../' );

section( 'Main app test', function( test ){

	test( 'Instantiate the app without options', function( done ){
		var s = oculus();
		done();
	});

	test( 'Instantiate the app with options', function( done ){
		var s = oculus({
			cssDirectory: './css',
			outputDirectory: './styleguide',
			server: {
				port: 3002,
				baseDir: './styleguide',
				index: 'index.html'
			}
		});

		done();
	});

	test.go();

});
