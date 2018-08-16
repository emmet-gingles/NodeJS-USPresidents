// export functions 
exports.sortArray = sortArray;
exports.countNameOccurrences = countNameOccurrences;

// function that takes an array and a fieldname as input parameters and outputs the array sorted by fieldname
function sortArray(array, fieldname){
	// sort array in ascending order by firstname
	if(fieldname == "firstname"){
		array.sort(function(a, b){
		  if(a.name < b.name) {  return -1; }
		  else if(a.name > b.name){ return 1; }
		  else { return 0; }
	});
	}
	// sort array in ascending order by lastname
	else if(fieldname == "lastname"){		
		array.sort(function(a, b){	
			// use split() to get the lastname from name field and perform sort on lastname
			if(a.name.split(" ")[a.name.split(" ").length-1] < b.name.split(" ")[b.name.split(" ").length-1]) {  return -1; }
		    else if(a.name.split(" ")[a.name.split(" ").length-1] > b.name.split(" ")[b.name.split(" ").length-1]){ return 1; }
			// if two lastname are the same then sort by firstname
		    else { if(a.name < b.name) {  return -1; }
					else if(a.name > b.name){ return 1; }
					else { return 0; } }
		});
	}
	// sort array in ascending order by age 
	else if(fieldname == "age"){
		array.sort(function(a, b){
		  if(a.age < b.age) {  return -1; }
		  else if(a.age > b.age){ return 1; }
		  else { return 0; }
	});
	}		  
	return array;
}

// function that takes an array as input parameter and outputs the occurrences of each name 
function countNameOccurrences(array){	
	var firstnames = [];
	// loop through sorted array
    for(i=0;i<array.length;i++){
	  // check each value up until the second last
	  if(i < array.length-1){
		  // check if the same president appears twice on the list i.e. Grover Cleaveland
		  if(array[i].name != array[i+1].name){
			  fname = array[i].name.split(" ")[0];
			  // if that name is not already in array add it with default occurrence
			  if(!firstnames.some(item => item.fname === fname )){
				  firstnames.push({ "fname" : fname, "occurrence" : 1 });
			  }
			  // else name is already in array so increment occurrence
			  else{
				 var item = firstnames.find(x => x.fname == fname);
				 if (item) {
				   item.occurrence ++;
				 }
			  }
		   }
	   }
	  // check last value 
		else{
			fname = array[i].name.split(" ")[0];
			  if(!firstnames.some(item => item.fname === fname )){
				  firstnames.push({ "fname" : fname, "occurrence" : 1 });
			  }
			 else{
				var item = firstnames.find(x => x.fname == fname);
				if (item) {
				  item.occurrence ++;
				}
			 }
		}
  }
  
  // sort array in descending order by occurrence
  firstnames.sort(function(a, b){
	  if(a.occurrence < b.occurrence) {  return 1; }
	  else if(b.occurrence < a.occurrence){ return -1; }
	  else { return 0; }
	  }); 
  return firstnames;
}