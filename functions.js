// File system module
var fs = require('fs');

// Function that checks a file path and returns true if it exists or false if it doesnt
function fileExists(filePath){
	// Use try/catch to validate whether the file path is valid
    try{
        return fs.statSync(filePath).isFile();
    }
    catch(err){
        return false;
    }
}

// Function that parses a JSON file and returns it content
function parseJSON(file){
	return JSON.parse(JSON.stringify(file));
}

// Function that takes an array and a fieldname as input parameters and returns the array sorted by fieldname
function sortArray(array, fieldname){
	// Sort array in ascending order by firstname
	if(fieldname == "firstname"){
		array.sort(function(a, b){
		  if(a.name < b.name) {  return -1; }
		  else if(a.name > b.name){ return 1; }
		  else { return 0; }
	});
	}
	// Sort array in ascending order by lastname
	else if(fieldname == "lastname"){		
		array.sort(function(a, b){	
			// Use split() to get the lastname from name field and perform sort on lastname
			if(a.name.split(" ")[a.name.split(" ").length-1] < b.name.split(" ")[b.name.split(" ").length-1]) {  return -1; }
		    else if(a.name.split(" ")[a.name.split(" ").length-1] > b.name.split(" ")[b.name.split(" ").length-1]){ return 1; }
			// If two lastname are the same then sort by firstname
		    else { if(a.name < b.name) {  return -1; }
				   else if(a.name > b.name){ return 1; }
				   else { return 0; } 
				 }
		});
	}
	// Sort array in ascending order by age 
	else if(fieldname == "age"){
		array.sort(function(a, b){
		  if(a.age < b.age) {  return -1; }
		  else if(a.age > b.age){ return 1; }
		  else { return 0; }
		});
	}	
	// Sort array in ascending order by the year 
	else if(fieldname == "year"){
		array.sort(function(a, b){
		  if(a.startterm < b.startterm) {  return -1; }
		  else if(a.startterm > b.startterm){ return 1; }
		  else { return 0; }
		});
	}
	// Return the sorted array
	return array;
}

// Function that takes an array as input parameter and outputs the occurrences of each firstname 
// Array should be sorted alphabetically beforehand as each name is compared to the next index.
// This is necessary to avoid counting twice a president who served non consecutive terms ie. Grover Cleaveland.
function countFirstnames(array){
	// Empty array of firstnames
	var firstnames = [];
	// Loop through sorted array
    for(i=0;i< array.length;i++){
		// Split the name by spaces
		splitData = array[i].name.split(" ");
		// Firstname is the first index and lastname is the last index 
		fname = splitData[0];
		lname = splitData[splitData.length-1];
		// Check each value up until the second last index 
		if(i< array.length-1){
			// Check if the same president appears twice on the list i.e. Grover Cleaveland
			if(array[i].name != array[i+1].name){
				// If that name is not already in array add it with default occurrence
				if(!firstnames.some(item => item.firstname === fname )){
					firstnames.push({ "firstname" : fname, "occurrence" : 1, "lastname" : lname });
				}
				// Else name is already in array so increment occurrence
				else{
					var item = firstnames.find(x => x.firstname == fname);
					if (item) {
						item.occurrence ++;
						item.lastname += ', '+ lname;
					}
				}
			}
		}
		// For last index 
		else {
			if(!firstnames.some(item => item.firstname === fname )){
				firstnames.push({ "firstname" : fname, "occurrence" : 1, "lastname" : lname });
			}
			else{
				var item = firstnames.find(x => x.firstname == fname);
				if (item) {
					item.occurrence ++;
					item.lastname += ', '+ lname;
				}
			}
		}
	}
  
  // Sort array in descending order by occurrence
  firstnames.sort(function(a, b){
	  if(a.occurrence < b.occurrence) {  return 1; }
	  else if(b.occurrence < a.occurrence){ return -1; }
	  else { return 0; }
  }); 
  // Return array 
  return firstnames;
}

// Function that takes an array as input parameter and outputs the occurrences of each lastname 
function countLastnames(array){	
	// Empty array of lastnames
	var lastnames = [];
	// Loop through sorted array
    for(i=0;i<array.length;i++){
		// Split the name by spaces 
		splitData = array[i].name.split(" ");
		// Firstname is the first index and lastname is the last index 
		fname = splitData[0];
		lname = splitData[splitData.length-1];		
		// Check each value up until the second last index 
		if(i < array.length-1){
			// Check if the same president appears twice on the list i.e. Grover Cleaveland
			if(array[i].name != array[i+1].name){
				// If that name is not already in array add it with default occurrence
				if(!lastnames.some(item => item.lastname === lname )){
					lastnames.push({ "lastname" : lname, "occurrence" : 1, "firstname" : fname });
				}
				// Else name is already in array so increment occurrence
				else {
					var item = lastnames.find(x => x.lastname == lname);
					if (item) {
						item.occurrence ++;
						item.firstname += ', '+ fname;
					}
				}
			}
		}
		// For last index  
		else{		
			if(!lastnames.some(item => item.laststname === lname )){
				lastnames.push({ "lastname" : lname, "occurrence" : 1, "firstname" : fname });
			}
		    else{
				var item = lastnames.find(x => x.lastname == lname);
				if (item) {
				  item.occurrence ++;
				  item.firstname += ', '+ fname;
				}
			}
		}
	}
  
	// Sort array in descending order by occurrence
	lastnames.sort(function(a, b){
		if(a.occurrence < b.occurrence) {  return 1; }
		else if(b.occurrence < a.occurrence){ return -1; }
		else { return 0; }
	}); 
	// Return array 
	return lastnames;
}

// Function that takes an array as input parameter and outputs the occurrences of each party
function countParties(array){	
	// Empty array of parties 
	var parties = [];
	// Loop through array
    for(i=0;i<array.length;i++){
		// Get the party from the current array index 
		party = array[i].party;
		// If the party is null then set value to "None"
		if(party == ""){
			party = "None";
		}
		// If that party is not already in array then add it to array with default occurrence
		if(!parties.some(item => item.party === party )){
	        parties.push({ "party" : party, "occurrence" : 1 });
	    }
		// Else party is already in array so increment occurrence
		else {
		    var item = parties.find(x => x.party == party);
			if (item) {
			    item.occurrence ++;
			}
		}
	}	
	// Sort array in descending order by occurrence
	parties.sort(function(a, b){
	    if(a.occurrence < b.occurrence) {  return 1; }
	    else if(b.occurrence < a.occurrence){ return -1; }
	    else { return 0; }
	});
	// Return array 
	return parties;
 }
  
  


// export functions 
exports.sortArray = sortArray;
exports.countFirstnames = countFirstnames;
exports.countLastnames = countLastnames;
exports.countParties = countParties;
exports.fileExists = fileExists;
exports.parseJSON = parseJSON;