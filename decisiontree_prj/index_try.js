
var DecisionTree = require('decision-tree');

// var training_data = [
// 	{"color":"blue", "shape":"square", "liked":false},
// 	{"color":"red", "shape":"square", "liked":false},
// 	{"color":"blue", "shape":"circle", "liked":true},
// 	{"color":"red", "shape":"circle", "liked":true},
// 	{"color":"blue", "shape":"hexagon", "liked":false},
// 	{"color":"red", "shape":"hexagon", "liked":false},
// 	{"color":"yellow", "shape":"hexagon", "liked":true},
// 	{"color":"yellow", "shape":"circle", "liked":true}
// ];

// var test_data = [
// 	{"color":"blue", "shape":"hexagon", "liked":false},
// 	{"color":"red", "shape":"hexagon", "liked":false},
// 	{"color":"yellow", "shape":"hexagon", "liked":false},
// 	{"color":"yellow", "shape":"circle", "liked":false}
// ];

// var class_name = "liked";
// var features = ["color", "shape"];
// var dt = new DecisionTree(training_data, class_name, features);
// var predicted_class = dt.predict({
//   	color: "blue",
//   	shape: "hexagon"
// });

// var test_data = [
// 	{"color":"bbbbbb", "shape":"aaaaa", "liked":false},
	// {"color":"purple", "shape":"hexagon", "liked":false},
	// {"color":"yellow", "shape":"hexagon", "liked":true},
	// {"color":"yellow", "shape":"circle", "liked":true}
// ];




// Multiple

// var training_data = [
// 	{"usertype":["S","M","C"], "customers":["AGILITY","HELLMANN","BDP","DHL","JASOCEAN"], "members":["SHPT","SSCC","SSLL"], "modaccess_programid":"17", "filetype":"Excel", "FromUpload":["Online", "Accurate"], "validatefile":'yes', "readyforInsert": true},
// 	{"usertype":"M", "modaccess":"Y", "customers":["AGILITY","Hellmann","BDP","DHL","JASOCEAN"], "members":["SHPT"], 			   "programid":["1"], "filetype":"Excel", "FromUpload":["Online", "Accurate"], "validatefile":true, "readyforInsert": true},
// 	{"usertype":"C", "modaccess":"Y", "customers":["AGILITY"], 									 "members":["SHPT","SSCC","SSLL"], "programid":["1"], "filetype":"Excel", "FromUpload":["Online", "Accurate"], "validatefile":true, "readyforInsert": true}
// ];

// //Valid
// var test_data = [
// {"usertype":"S", "customers":["AGILITY","Hellmann","BDP","DHL","JASOCEAN"], "members":["SHPT","SSCC","SSLL"], "modaccess_programid":["17","18","19","20"], "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
// //Invalid Usertype
// {"usertype":"A", "customers":["AGILITY","Hellmann","BDP","DHL","JASOCEAN"], "members":["SHPT","SSCC","SSLL"], "modaccess_programid":["17","18","19","20"], "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
// //Not Configured
// {"usertype":"S", "customers":["AGILITY","Hellmann","BDP","DHL","JASOCEAN"], "members":["SHPT","SSCC","SSLL"], "modaccess_programid":"17", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
// //Invalid Member
// {"usertype":"M", "customers":["AGILITY","Hellmann","BDP","DHL","JASOCEAN"], "members":"ABCD", "modaccess_programid":"18", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
// //Invalid Customer
// {"usertype":"C", "customers":"DSV", "members":"ABCD", "modaccess_programid":"18", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
// //Invalid FileType
// {"usertype":"C", "customers":"DSV", "members":"ABCD", "modaccess_programid":"18", "filetype":"CSV", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true}
// ];


// Single

var training_data = [
	{"usertype":"S", "customers":"AGILITY", "members":"SHPT", "modaccess_programid":"17", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true}
];

//Valid
var test_data = [
{"usertype":"S", "customers":"AGILITY", "members":"SHPT", "modaccess_programid":"17", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
//Invalid Usertype
{"usertype":"Z", "customers":"AGILITY", "members":"SHPT", "modaccess_programid":"17", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
//Not Configured
{"usertype":"S", "customers":"AGILITY", "members":"SHPT", "modaccess_programid":"50", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
//Invalid Member
{"usertype":"M", "customers":"AGILITY", "members":"ABCD", "modaccess_programid":"18", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
//Invalid Customer
{"usertype":"C", "customers":"DSV", "members":"SHPT", "modaccess_programid":"17", "filetype":"Excel", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true},
//Invalid FileType
{"usertype":"C", "customers":"AGILITY", "members":"SHPT", "modaccess_programid":"17", "filetype":"CSV", "FromUpload":"Online", "validatefile":'yes', "readyforInsert": true}
];


var class_name = "readyforInsert";
var features = ["usertype","customers","members","modaccess_programid","filetype","FromUpload","validatefile","readyforInsert"];

var dt = new DecisionTree(training_data, class_name, features);
// var predicted_class = dt.predict({
//   	usertype: "S",
//   	customers: "JASOCEAN",
//   	members: "SHPT",
//   	modaccess_programid: "17",
//   	filetype: "Online",
//   	validatefile:'yes',
//   	readyforInsert: true
// });
var predicted_class = dt.predict({"usertype":"S",
 "customers":"AGILITY",
 "members":"SHPT",
 "modaccess_programid":"17",
 "filetype":"Excel",
 "FromUpload":"Online",
 "validatefile":'yes',
 "readyforInsert": true}
);
var accuracy = dt.evaluate(test_data);
var treeModel = dt.toJSON();
console.log('accuracy');
console.log(accuracy);
// console.log('dt');
// console.log(dt);
console.log('treeModel');
console.log(treeModel);
// console.log('treeModel.vals');
// console.log(treeModel.vals);
// console.log('treeModel.vals.child');
// console.log(treeModel.vals.child);