import PlantService from "./perenial";

function getPlantByName(plantSearch){
    PlantService.getPlantByName(plantSearch)
        .then(function(response){
            if (response){
                console.log(response.data)
                printList1(response);
            } else {
                console.log(response)
            }
        });
}


// function getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput){
//     PlantService.getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput)
//     .then(function(response){
//         if (response.data){
//             printList2(response);
//         }
//         else{
//             printError(response);
//         }
//     });
// }


function printList1(response) {
    //target div
    const newList = document.createElement("ul");
    let newArray = response.data;

    // Create a set to store the names of the plants we've already added
    let plantNames = new Set();

    newArray.forEach(function(object) {
        
        if (object.cycle.includes('Upgrade')){
            object = '';
        } else {
            // Check if we've already added a plant with this name
            if (!plantNames.has(object.common_name)) {
                let newListItem = document.createElement("li");
                newListItem.innerText = object.common_name;
                newList.append(newListItem);
                console.log(newListItem);
                
                // Add the name of the plant to our set
                plantNames.add(object.common_name);
            }
        }
        
    });
    document.getElementById('nursery-results').appendChild(newList);
}

function handlePlantSearch(event) {
    event.preventDefault();
    //Get elemnt
    let plantName = document.getElementById('plantName');
    let plantNameValue = plantName.value;
    console.log(plantNameValue);

    //Pass value to print or error functions
    getPlantByName(plantNameValue);
    
}

document.querySelector("#plantSearch").addEventListener("submit", handlePlantSearch)


// function printError(response) {

//     ///target div
// }