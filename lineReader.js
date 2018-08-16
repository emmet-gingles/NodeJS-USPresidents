// functions.js used for calling functions on data 
var functions = require('./functions.js');
// line-read module used for reading each line of file 
var lineReader = require('line-reader');
// bluebird module used for creating a promise when reading file 
var Promise = require('bluebird');
// function called using promise and lineReader
var eachLine = Promise.promisify(lineReader.eachLine);
// file to be read 
var file = 'Files/US presidents.txt';
// variable to keep track of the line we are on 
var lineNo = 0;
// array to store the data read from file 
var presidents = [];

eachLine(file, function(line) {
	// increment for each new line 
	lineNo++;
	// this stops it from reading the header
	if(lineNo > 1){
		// split the line by comma and create variable from each part of the split
		var output = line.split(',');
		var name = output[1];
		var number = output[0];
		var startTerm = output[2];
		var endTerm = output[3];
		var party = output[4];
		var age = output[5];
		// add data to array
		presidents.push({"number" : number, "name" : name, "startTerm" : startTerm, "endTerm" : endTerm, "party" : party, "age" : age });	
	} 
	// called only once the file has finished reading 
}).then(function() { 
	// call function to sort array by firstname
	var names = functions.sortArray(presidents, "firstname");
	// call function to get the occurrences of each name 
    var nameOccurrence = functions.countNameOccurrences(names);
	// loop through the array and print the name and its occurrence
    for(i=0;i<nameOccurrence.length;i++){
	    console.log(nameOccurrence[i] );
    }
}).catch(function(err) {
    console.error(err);
});

