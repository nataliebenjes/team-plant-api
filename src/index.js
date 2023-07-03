import PlantService from "./perenial";
// Fetch response from API via query search
function getPlantByName(plantSearch){
    PlantService.getPlantByName(plantSearch)
        .then(function(response){
            if (response){
                console.log(response.data)
                printList(response);
            } else {
                console.log(response)
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
        document.getElementById('nursery-results').appendChild(error);
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
                document.getElementById('nursery-results').appendChild(cardDiv);
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
        PlantService.getPlantInfo(e.target.id);
        
    });
}

//form for the search
function handlePlantSearch(event) {
    event.preventDefault();
    let plantName = document.getElementById('plantName');
    let plantNameValue = plantName.value;
    console.log(plantNameValue);

    //Pass the input user into the fetch API
    getPlantByName(plantNameValue);
}

//Event listener
document.querySelector("#plantSearch").addEventListener("submit", handlePlantSearch);