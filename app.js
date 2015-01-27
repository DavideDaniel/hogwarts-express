var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var methodOverride = require('method-override')
var app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));


var students = {
	0: {
		id: 0,
		name: "David",
		age: "18",
		favorite_spell: "apparating"
	}
}

var counter = 1

app.get( '/students', function ( req, res ) {
	res.render( 'index.ejs', {
		students: students
	} )
} );

app.get( '/student/:id', function ( req, res ) {
	var thisStudent = students[req.params.id]
	res.render( 'show.ejs', {
		thisStudent: thisStudent
	} )
} );


app.listen( 3000 );

console.log( "Server listening on port: 3000" );