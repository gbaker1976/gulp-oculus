var section = require( './tester' ).section;
var assert = require( 'assert' );
var Oculus = require( '../' );

section( 'Main app test', function( test ){

	test( 'Instantiate the app without options', function( done ){
		var oculus = new Oculus();
		done( oculus instanceof Oculus );
	});

	test( 'Instantiate the app with options', function( done ){
		var oculus = new Oculus({
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
