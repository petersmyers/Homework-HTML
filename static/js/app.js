// from data.js
var tabledata = data;

// ****************************Step 1**********************************
// we need a table to appear on the page. Let's try to make that happen.
// ********************************************************************
// Define the table body
var tbody = d3.select("tbody");
var table = d3.select("table");

// Our data has the following keys:
// Datetime; City; State; Country; Shape; Duration(minutes); comments 
// We have columns in place for each of these categories the HTML. We need to fill the talbe 
// Create a function that will take an entry in the dataset and fill in the cells with the appropriate information
tbody.remove();

function tableload(data) {
    // First, this function will create a 'tbody' attribute for table because we remove with each iteration. This function assigns tbody with the appropriate attributes
    table.append("tbody");
    tbody=d3.select("tbody");
    tbody.attr("class", "table table-striped")

    // Next, we want the function to go through each row of the data and print it to the table
    // Tbody is assigned a tr and for each sighting with multiple td's for each column
    data.forEach(function(sighting){
        tbody = d3.select("tbody");
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(function([key, value]) {
            var cell = tbody.append("td");
        cell.text(value);
        });
    }
)};

// This function is meant to tell you that there was an issue with your query
function empty(date) {
    table.append("tbody");
    tbody=d3.select("tbody");
    tbody.attr("class", "table table-striped")
    tbody = d3.select("tbody");
    var row = tbody.append("tr");
    console.log(`No entries for those query specifications exist`);
    var cell = tbody.append("td");
    cell.text(`No entries for those query specifications exist`);
};


// Now load the actual data when the page is first opened
tableload(tabledata);

// ****************************Step 2**********************************
// Listen for someone to request specific dates and filter
// ********************************************************************
var date_butt = d3.select("#filter-btn-date");
date_butt.on("click", function(){
    // Stop the page from refreshing
    d3.event.preventDefault();

    // Capture the date that was entered
    var date_request = d3.select("#datetime.form-control");
    var date = date_request.property("value");
    console.log(date.length);

    // Capture the city requested
    var city_request = d3.select("#city.form-control");
    var city = city_request.property("value");
    console.log(city.length);

    // And then get that state if they entered it
    var state_request = d3.select("#state.form-control");
    var state = state_request.property("value");
    console.log(state.length);

    // And maybe a country just in case
    var country_request = d3.select("#country.form-control");
    var country = country_request.property("value");
    console.log(country.length);

    // Most importantly, we need a Shape!
    var shape_request = d3.select("#shape.form-control");
    var shape = shape_request.property("value");
    console.log(shape.length);

    // Here's a function to look through the dates and compare them to the one we entered
    function findDate(sighting) {
        return sighting.datetime === date;
      }
    // And here's one to filter for cities! what joy this brings.... no one.
    function findCity(sighting) {
        return sighting.city === city;
      }
      // And while we're at it, may as well filter through states if the user wants
    function findState(sighting) {
        return sighting.state === state;
      }
      // And while countries should probably have been first, here it is now. Better late than never!
    function findCountry(sighting) {
        return sighting.country === country;
      }
      // Who knows what kind of shape one may see... but fireball is one of the options!
    function findShape(sighting) {
        return sighting.shape === shape;
      }
    // Set the original data as filtdata. Could probably have used "tabledata" as well
    filtdata = data;

    // Now create a new set of data that corresponds to all the various request boundaries the user entered
    if(date && date.length){
        var filtdata = filtdata.filter(findDate); 
    };
    if(city && city.length){
        var filtdata = filtdata.filter(findCity); 
    };
    if(state && state.length){
        var filtdata = filtdata.filter(findState); 
    };
    if(country && country.length){
        var filtdata = filtdata.filter(findCountry); 
    };
    if(shape && shape.length){
        var filtdata = filtdata.filter(findShape); 
    };

    // Remove the tbody attribute so we can put it back in with the tableload function
    tbody.remove();
    
    // Given all the possibilities one may enter, there's a high probability that they will fuck it up and make a request that we cannot match. so we check to see if there's anything in the Dataset. If Notification, then we use the empty function defined above to deliver the sad news
    if (filtdata && filtdata.length ){
        tableload(filtdata);
        console.log(filtdata);
    }  
    else {
        empty(date);
    };  
});
