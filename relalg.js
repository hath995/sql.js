var _ = require('lodash');
function Table(name, definition, records, fields) {
	this.name = name;
	this.definition = definition; // {"fieldname":{"Type":""}}
	this.fields = fields || Object.keys(definition);
	this.records = records || [];
}

Table.prototype.select = function(predicate) {
	return new Table(this.name, this.definition, this.records.filter(predicate));
}

Table.prototype.projection = function(fields) {
	var newdef = {};
	for(var field in fields) {
		newdef[fields[field]] = this.definition[fields[field]];
	}	
	var records = this.records.map(function(elem) {
		return _.pick(elem,fields);	
	}); 
	return new Table(this.name, newdef, records); 
}

Table.prototype.union = function(other) {
	//todo check for matching arity and domains
	var union = [].concat(this.records).concat(other.records);
	return new Table(this.name,this.definition,union)
}

Table.prototype.difference = function(other) {

}

Table.prototype.cartesian = function(other) {

};

Table.prototype.thetaJoin = function(other, theta) {
	var rows = [];
	var fields = this.fields.slice().concat(theta.fields);
	var defs = _.merge(this.defition, other.definition);
	for(var t in this.records) {
		for(var r in other.records) {
			if(theta(this.records[t], this.records[r])) {
				var hmm = _.cloneDeep(this.records[t]);
				for(var f in r) {
					if(!(f in hmm)) {
						hmm[r.name+'.'+f] = other.records[r][f];
					}else{ 
						hmm[f] = other.records[r][f];
					}
				}
				rows.push(hmm);
			}
		}
	}
	return new Table(this.name+"."+other.name, defs, rows, fields);
}
module.exports = Table;
