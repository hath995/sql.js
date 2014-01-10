var Table = require('./relalg') 
var courserecs = [{course_id:"BIO-101",sec_id:1,semester:"Summer",year:2009,building:"Painter",room_number:514,time_slot:"B"},
{course_id:"BIO-301",sec_id:1,semester:"Summer",year:2010,building:"Painter",room_number:514,time_slot:"A"},
{course_id:"CS-101",sec_id:1,semester:"Fall",year:2009,building:"Packard",room_number:101,time_slot:"H"},
{course_id:"CS-101",sec_id:1,semester:"Spring",year:2010,building:"Packard",room_number:101,time_slot:"F"},
{course_id:"CS-190",sec_id:1,semester:"Spring",year:2009,building:"Taylor",room_number:3128,time_slot:"E"},
{course_id:"CS-190",sec_id:2,semester:"Spring",year:2009,building:"Taylor",room_number:3128,time_slot:"A"},
{course_id:"CS-315",sec_id:1,semester:"Spring",year:2010,building:"Watson",room_number:120,time_slot:"D"},
{course_id:"CS-319",sec_id:1,semester:"Spring",year:2010,building:"Watson",room_number:100,time_slot:"B"},
{course_id:"CS-319",sec_id:2,semester:"Spring",year:2010,building:"Taylor",room_number:3128,time_slot:"C"},
{course_id:"CS-347",sec_id:1,semester:"Fall",year:2009,building:"Taylor",room_number:3128,time_slot:"A"},
{course_id:"EE-181",sec_id:1,semester:"Spring",year:2009,building:"Taylor",room_number:3128,time_slot:"C"},
{course_id:"FIN-201",sec_id:1,semester:"Spring",year:2010,building:"Packard",room_number:101,time_slot:"B"},
{course_id:"HIS-351",sec_id:1,semester:"Spring",year:2010,building:"Painter",room_number:514,time_slot:"C"},
{course_id:"MU-199",sec_id:1,semester:"Spring",year:2010,building:"Packard",room_number:101,time_slot:"D"},
{course_id:"PHY-101",sec_id:1,semester:"Fall",year:2009,building:"Watson",room_number:100,time_slot:"A"}];
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
var cdef = {course_id:{},sec_id:{},semester:{},year:{},building:{},room_number:{},time_slot:{}}
var inst = new Table("Instructors",def,instructors);
var course = new Table("Courses",cdef,courserecs);


console.log("salary ",JSON.stringify(inst.select(function(elem){
	return elem.salary > 90000;
}).records),"\n");


console.log("dept ",JSON.stringify(inst.select(function(elem){
	return elem.dept_name == "Physics";
}).records),"\n");
console.log("projection ", JSON.stringify(inst.projection(["id","name","salary"])), "\n");

var fall = function(elem) {
	return elem.semester === "Fall" && elem.year === 2009;
};
var spring = function(elem){
	return elem.semester === "Spring" && elem.year === 2010;
};
var cid = ["course_id"];
console.log("union test", JSON.stringify(course.select(fall).projection(cid).union(course.select(spring).projection(cid))), "\n");

console.log("join test", JSON.stringify(inst.thetaJoin(course, function(a,b){return true;})));
