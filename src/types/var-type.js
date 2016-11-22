const DocumentedItem = require('./item');

class DocumentedVarType extends DocumentedItem {
	registerMetaInfo(data) {
		this.directData = data;
	}

	serialize() {
		const names = [];
		for(const name of this.directData.names) names.push(splitVarName(name));
		return { types: names };
	}
}

/*
{
  "names":[
    "String"
  ]
}
*/

function splitVarName(str) {
	if(str === '*') return ['*', ''];
	const matches = str.match(/([\w]+)([^\w]+)/g);
	const output = [];
	if(matches) {
		for(const match of matches) {
			const groups = match.match(/([\w]+)([^\w]+)/);
			output.push([groups[1], groups[2]]);
		}
	} else {
		output.push([str.match(/(\w+)/g)[0], '']);
	}
	return output;
}

module.exports = DocumentedVarType;