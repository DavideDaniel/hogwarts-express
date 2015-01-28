var fs = require('fs');

var roster = {
	0: {
		id: 0,
		name: "Severus Snape",
		age: "16",
		favorite_spell: "Sectumsempra"
	}
}

fs.writeFile('roster.json', JSON.stringify(roster))