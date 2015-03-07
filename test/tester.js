var test = function( label, callback ){
	callback( done );
};

var done = function(){

};

module.exports = {
	section: function( label, callback ){
		callback( test );
	}
}
