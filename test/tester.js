var chalk = require( 'chalk' );
var tests = [];
var i = null;
var test = function( label, callback ){
	tests.push( { label: label, callback: callback });
};

test.go = function(){
	tests.forEach(function(t){

		i = setTimeout(function(){
			console.log( chalk.blue( t.label ) );
			done( false, 'Test execution exceeded timeout!' );
		}, 3000);

		t.callback( function(){
			clearTimeout( i );
			console.log( chalk.blue( t.label ) );
			done.call( {}, arguments );
		});
	});
};

var done = function( result, message ){
	result = result !== false;
	message = message || 'FAILED';

	if ( false === result ) {
		console.log( chalk.red( message ) );
		process.exit(1);
		return;
	}
	console.log( chalk.green.bold( 'PASSED' ) );
};

module.exports = {
	section: function( label, callback ){
		console.log( chalk.blue.underline.bold( label ) );
		callback( test );
	}
}
