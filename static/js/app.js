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
    var tbody=d3.select("tbody");
    tbody.attr("class", "table table-striped")

    // Next, we want the function to go through each row of the data and print it to the table
    // Tbody is assigned a tr and for each sighting with multiple td's for each column
    data.forEach(function(sighting){
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(function([key, value]) {
            var cell = tbody.append("td");
        cell.text(value);
        });
    }
)};

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
    console.log(date);

    // Here's a function to look through the dates and compare them to the one we entered
    function findDate(sighting) {
        return sighting.datetime === date;
      }

    // Now create a new set of data that correspond to the date we want
    var filtdata = data.filter(findDate); 

    // Remove the tbody attribute so we can put it back in with the tableload function
    tbody.remove();

    // Run the tableload function defined above to load the filtered data
    tableload(filtdata);
    console.log(filtdata);
    // if (tabledata.length === 0){
    //     console.log(`No entries for ${date} exist`);
    //     var cell = tbody.append("td");
    //     cell.text(`No entries for ${date} exist`);
    // }  
    // else{
    //         tableload(tabledata);
    //         console.log(tabledata);
    //     };
        
    }
);
