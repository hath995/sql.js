var lazy = require('lazy.js');
function Table(name, definition, records) {
	this.name = name;
	this.definition = definition; // {"fieldname":{"Type":""}}
	this.records = records || [];
}

Table.prototype.select = function(predicate) {
	return new Table(this.name, this.definition, lazy(this.records).filter(predicate));
}

Table.prototype.projection = function(fields) {
	var newdef = {};
	for(var field in fields) {
		newdef[fields[field]] = this.definition[fields[field]];
	}	
	var records = this.records.map(function(elem) {
		return lazy(elem).pick(fields).toObject();	
	}); 
	return new Table(this.name, newdef, records); 
}

module.exports = Table;
