// HTTP module for server
var http = require('http');
// URL module for parsing URL
var url = require('url');
// Functions file
var functions = require('./functions.js');
// Path to the JSON file
var filePath = './Files/presidents.json';

// First make sure that the file exists
if(functions.fileExists(filePath)) {
	// Create variable of file using the filePath
	var file = require(filePath);
	// Inform the user of what to do
	console.log("Server running on localhost:8080");
	
	// Web browser interface on port 8080	
	http.createServer(function (req, res) {
		// Call function to parse the JSON file
		var data = functions.parseJSON(file);
		// Get the presidents array from the data
		var presidents = data.presidents;
		// Parse the URL
		var q = url.parse(req.url, true);
		// Get the query from URL. Query is everything after '?'
		query = q.query
		// Inform the page that JSON is about to be written
		res.writeHead(200, {'Content-Type': 'application/json'});
		
		// If URL is in the format localhost:8080/countfirstname then return the total of each firstname
		if(q.pathname == "/countfirstname"){
			// First call function to sort the array by firstname. This is necessary for presidents who served non consecutive term ie. Grover Cleaveland
			var results = functions.sortArray(presidents, 'firstname');
			// Call function to return the total for each firstname
			results = functions.countFirstnames(results);
			// If a firstname is requested then filter data to return all presidents with that firstname
			if (query.firstname != undefined){
				var filter_results = results.filter(function(pres){
					return pres.firstname.toLowerCase().startsWith(query.firstname);
				});
				res.write(JSON.stringify(filter_results));
			}
			// Else show list of all firstnames
			else{
				res.write(JSON.stringify(results));	
			}
		}
		
		// If URL is in the format localhost:8080/countlastname then return the total of each lastname
		else if(q.pathname == "/countlastname"){
			// First call function to sort the array by lastname. This is necessary for presidents who served non consecutive term ie. Grover Cleaveland
			var results = functions.sortArray(presidents, 'lastname');
			// Call function to return the total for each lastname
			results = functions.countLastnames(results);
			// If a lastname is requested then filter data to return presidents with that lastname
			if (query.lastname != undefined){
				var filter_results = results.filter(function(pres){
					return pres.lastname.toLowerCase().startsWith(query.lastname);
				});
				res.write(JSON.stringify(filter_results));
			}
			// Else show list of all lastnames
			else{
				res.write(JSON.stringify(results));	
			}				
		}
		
		// If URL is in the format localhost:8080/countparty then return the total of each party
		else if(q.pathname == "/countparty"){
			// Call function to return the total for each party
			var results = functions.countParties(presidents);
			// If a party is requested then filter data to return all presidents with that party
			if (query.party != undefined){
				var filter_results = results.filter(function(pres){
					return pres.party.toLowerCase().startsWith(query.party);
				});
				res.write(JSON.stringify(filter_results));
			}
			// Else show list of all presidents
			else{
				res.write(JSON.stringify(results));	
			}
		}
		
		// If the query includes both a firstname and a lastname then return any presidents that match
		else if (query.firstname != undefined && query.lastname != undefined){
			// Get the firstname and lastname and convert to lowercase
			var fname = query.firstname.toLowerCase();
			var lname = query.lastname.toLowerCase();
			// Filter data to return any president with that firstname and lastname
			var filter_results = presidents.filter(function(pres) {
				return pres.name.toLowerCase().startsWith(fname) && pres.name.toLowerCase().endsWith(lname);
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If the query includes a firstname but no lastname then return any presidents that match
		else if (query.firstname != undefined && query.lastname == undefined){
			// Get the firstname and convert it to lowercase
			var search = query.firstname.toLowerCase();
			// Filter data to return all presidents with that firstname
			var filter_results = presidents.filter(function(pres) {	
				return pres.name.toLowerCase().startsWith(search);
			});
			// If orderby is requested then change the order of the results 
			if (query.orderby != undefined){
				// Get orderby from query
				orderby = query.orderby
				// Call function to sort data by the orderby parameter			
				filter_results = functions.sortArray(filter_results, orderby);
			}
			// Write out each state as a JSON object
			res.write(JSON.stringify(filter_results));
		}
		
		// If the query includes a lastname but no firstname then return any presidents that match
		else if (query.lastname != undefined && query.firstname == undefined){
			// Get the lastname and convert it to lowercase
			var search = query.lastname.toLowerCase();
			// Filter data to return all presidents with that lastname
			var filter_results = presidents.filter(function(pres) {	
				return pres.name.toLowerCase().endsWith(search);
			});
			// If orderby is requested then change the order of the results 
			if (query.orderby != undefined){
				// Get orderby from query
				orderby = query.orderby
				// Call function to sort data by the orderby parameter				
				filter_results = functions.sortArray(filter_results, orderby);
			}
			// Write out each state as a JSON object
			res.write(JSON.stringify(filter_results));
		}
		
		// If the query includes a party then return any presidents that match 
		else if(query.party != undefined){
			// Get the party and convert it to lowercase
			var search = query.party.toLowerCase();
			// Filter data to return all presidents with the party
			var filter_results = presidents.filter(function(pres) {	
				return pres.party.toLowerCase() == search;
			});
			// If orderby is requested then change the order of the results 
			if (query.orderby != undefined){
				// Get orderby from query
				orderby = query.orderby
				// Call function to sort data by the orderby parameter				
				filter_results = functions.sortArray(filter_results, orderby);
			}
			// Write out each state as a JSON object
			res.write(JSON.stringify(filter_results));
		}
		
		// If the query includes both a minimum and maximum age then return any presidents between the two ages
		else if(query.minage != undefined &&  query.maxage != undefined) {
			// Get the minimum and maximum ages 
			var minAge = query.minage;
			var maxAge = query.maxage;
			// Filter data to return all presidents between the minimum and maximum age 
			var filter_results = presidents.filter(function(pres) {
				return pres.age >= minAge && pres.age <= maxAge;
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If query includes a minimum age but no maximum age then return any presidents greater than or equal to that age 
		else if(query.minage != undefined && query.maxage == undefined) {
			// Get the minimum age 
			var minAge = query.minage;
			// Filter data to return all presidents greater then or equal to the minimum age
			var filter_results = presidents.filter(function(pres) {
				return pres.age >= minAge;
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If query includes a maximum age but no minimum age then return any presidents less than or equal to that age 
		else if(query.maxage != undefined && query.minage == undefined) {
			// Get the maximum age
			var maxAge = query.maxage;
			// Filter data to return all presidents less then or equal to the maximum age 
			var filter_results = presidents.filter(function(pres) {
				return pres.age <= maxAge;
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If the query includes both a start year and end year then return any presidents inaugurated between the two years
		else if(query.startyear != undefined &&  query.endyear != undefined) {
			// Get the start and end year
			var startYear = query.startyear;
			var endYear = query.endyear;
			// Filter data to return all presidents inaugurated between the start and end year 
			var filter_results = presidents.filter(function(pres) {
				return pres.startterm >= startYear && pres.startterm <= endYear;
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If query just includes a start year but no end year then return any presidents inaugurated starting from that year
		else if(query.startyear != undefined && query.endyear == undefined) {
			// Get the start year 
			var startYear = query.startyear;
			// Filter data to return all presidents inaugurated starting from the start year
			var filter_results = presidents.filter(function(pres) {
				return pres.startterm >= startYear;
			});
			res.write(JSON.stringify(filter_results));
		}
		
		// If query just includes an end year but no start year then return any presidents inaugurated up to that year
		else if(query.endyear != undefined && query.startyear == undefined) {
			// Get the end year 
			var endYear = query.endyear;
			// Filter data to return all presidents inaugurated up to the end year
			var filter_results = presidents.filter(function(pres) {
				return pres.startterm <= endYear;
			});
			res.write(JSON.stringify(filter_results));
		}	
		
		// Else return the full array
		else{
			// If orderby is requested then change the order of the results 
			if (query.orderby != undefined){
				// Get the orderby
				orderby = query.orderby;
				// Call function to sort the list by the orederby parameter				
				presidents = functions.sortArray(presidents, orderby);
			}
			// If the query include reverse
			if(query.reverse != undefined){
				reverse = query.reverse;
				// If reverse equals true then reverse the array 
				if(reverse == "true") {
					presidents = presidents.reverse();
				}
			}
			// Write out array data			
			res.write(JSON.stringify(presidents));			
		}
		res.end();
	}).listen(8080);	
}
// Else file does not exist
else{
	console.log("File not found");
}

