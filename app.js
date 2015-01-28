var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' )
var app = express();

app.use(bodyParser());
app.use( methodOverride( '_method' ) )
app.use( express.static( __dirname + '/public' ) );

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
	var thisStudent = students[ req.params.id ]
	res.render( 'show.ejs', {
		thisStudent: thisStudent
	} )
} );

app.post( '/student', function ( req, res ) {
	var student = {
		id: counter,
		name: req.body.name,
		age: req.body.age,
		favorite_spell: req.body.faveSpell,
	};
	console.log(student);
	students[counter] = student;
	counter++
	console.log(students.counter);
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