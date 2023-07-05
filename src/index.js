import PlantService from "./perenial";
import './css/styles.css';
// Fetch response from API via query search
function getPlantByName(plantSearch){
    PlantService.getPlantByName(plantSearch)
        .then(function(response){
            if (response.data){
                console.log(response.data)
                printList(response.data);
            } else {
                printError(response);
            }
        });
}

// Takes 
function printList(response) {
    //Store data from Json response
    let newArray = response.data;
    
    //Check for duplications
    let plantNames = new Set();
    //Check if search end up with no results
    if(response.total === 0) {
        //Prints Error if 0 result
        let error = document.createElement('small');
        error.innerText = 'Error, your search is not found';
        document.querySelector('.nursery-results').appendChild(error);
    }
    //Check validation and display results in the DOM
    newArray.forEach(function(object) {
        //Filter premium results
        if (object.cycle.includes('Upgrade')){
            object = '';
        } else {
            //Create elements with the plant data
            if (!plantNames.has(object.common_name)) {
                let cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                <div id="${object.common_name}-wrapper">
                <input class="hidden-checkbox" id="${object.id}" type="checkbox">
                <label for="${object.id}">${object.common_name}</label>
                </div>
                `;
                //Display the results in the DOM
                document.querySelector('.nursery-results').appendChild(cardDiv);
                setupCheckboxListener(object.id); // This sets up the listener for the newly created checkbox
                plantNames.add(object.common_name);
            }
        }
    });

}
//Set checkbox and listen to a click
function setupCheckboxListener(id) {
    
    const checkbox = document.getElementById(id);
    checkbox.addEventListener('click', function (e) {

        //passing the id of the selected element into getPlantInfo API call
        PlantService.getPlantInfo(e.target.id)
            .then(function(response){
            if (response){
                createPlantName(response);
            } else {
                console.log(response)
            }
        });
        
        
    });
}

function printError(response) {
    let error = document.createElement('small');
    error.innerText = `Error, there was an issue with your search call: ${response}`;
    document.querySelector('.nursery-results').appendChild(error);
}

function createPlantName (response) {
    // Ensure response object and required properties exist
    if (response && response.common_name && response.description && response.default_image && response.default_image.medium_url) {
        let displayName = document.querySelector('.display-name')
        displayName.innerHTML =
            `<h3 class ="display-name-h">${response.common_name}</h3>
            <p class ="display-name-p">${response.description}</p>
            <img class ="display-name-img" src="${response.default_image.medium_url}" alt="${response.common_name}">`;
    } else {
        console.error('Invalid response object:', response);
    }
}

//form for the search
function handlePlantSearch(event) {
    event.preventDefault();
    //Empty the container
    document.querySelector('.nursery-results').innerHTML = '';
    document.querySelector('.display-name').innerHTML = '';

    let plantName = document.getElementById('plantName');
    let plantNameValue = plantName.value;
    console.log(plantNameValue);

    //Pass the input user into the fetch API
    getPlantByName(plantNameValue);
}

//Event listener
document.querySelector("#plantSearch").addEventListener("submit", handlePlantSearch);