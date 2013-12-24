var Table = require('./relalg') 

var instructors =[
{"id":10101,"name":"Srinivasan","dept_name":"Comp. Sci.","salary":65000},
{"id":12121,"name":"Wu","dept_name":"Finance","salary":90000},
{"id":15151,"name":"Mozart","dept_name":"Music","salary":40000},
{"id":22222,"name":"Einstein","dept_name":"Physics","salary":95000},
{"id":32343,"name":"El Said","dept_name":"History","salary":"60000"},
{"id":33456,"name":"Gold","dept_name":"Physics","salary":87000},
{"id":45565,"name":"Katz","dept_name":"Comp. Sci.","salary":75000},
{"id":58583,"name":"Califieri","dept_name":"History","salary":62000},
{"id":76543,"name":"Singh","dept_name":"Finance","salary":80000},
{"id":76766,"name":"Crick","dept_name":"Biology","salary":72000},
{"id":83821,"name":"Brandt","dept_name":"Comp. Sci.","salary":92000},
{"id":98345,"name":"Kim","dept_name":"Elec. Eng.","salary":80000},
];
var def = {id:{},name:{},dept_name:{},salary:{}};

var inst = new Table("Instructors",def,instructors);
/*
console.log("salary ",JSON.stringify(inst.select(function(elem){
	return elem.salary > 90000;
}).records.toArray()));


console.log("dept ",JSON.stringify(inst.select(function(elem){
	return elem.dept_name == "Physics";
}).records.toArray()));
*/
console.log("projection ", JSON.stringify(inst.projection(["id","name","salary"])));
