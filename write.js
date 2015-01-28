var fs = require('fs');

var roster = {
	0: {
		id: 0,
		name: "David",
		age: "33",
		favorite_spell: "apparating"
	}
}

fs.writeFile('roster.json', JSON.stringify(roster))