var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' )
var fs = require( 'fs' );
var app = express();

app.use( bodyParser() );
app.use( methodOverride( '_method' ) )
app.use( express.static( __dirname + '/public' ) );

var roster = fs.readFileSync( 'roster.json', 'utf8' );

var parsedRoster = JSON.parse( roster );
console.log( roster );
console.log( "that should be buffer" );

console.log( parsedRoster );
console.log( "that's parsed" );

var students = roster;
console.log(students);
var counter = 1

var none = {
	status: "No such student is registered."
}

app.get( '/students', function ( req, res ) {
	res.render( 'index.ejs', {
		students: students
	} )
} );

app.get( '/student/:id', function ( req, res ) {
	var thisStudent = students[ req.params.id ]
	res.render( 'show.ejs', {
		thisStudent: thisStudent
	} )
} );

app.get( '/search', function ( req, res ) {
	res.render( 'search.ejs' )
} );

app.get( '/search/:searchName', function ( req, res ) {
	for ( var student in students ) {
		if ( students[ student ].name === req.params.searchName ) {
			res.redirect( '/student/' + students[ student ].id )
		}
		else {
			res.render( 'search.ejs', none )
		}
	};
} );

app.post( '/student', function ( req, res ) {
	var student = {
		id: counter,
		name: req.body.name,
		age: req.body.age,
		favorite_spell: req.body.faveSpell,
	};
	console.log( student );
	students[ counter ] = student;
	counter++
	console.log( students.counter );
	res.method = 'get';
	res.redirect( '/students' );
} );

app.put( '/student/:id', function ( req, res ) {

	students[ req.params.id ].name = req.body.newName;
	students[ req.params.id ].favorite_spell = req.body.newFaveSpell;
	req.method = 'get';
	res.redirect( '/student/' + req.params.id )
} )

app.delete( '/student/:id', function ( req, res ) {
	delete students[ req.params.id ];
	req.method = 'get';
	res.redirect( '/students' );
} );

app.listen( 3000 );

console.log( "Server listening on port: 3000" );