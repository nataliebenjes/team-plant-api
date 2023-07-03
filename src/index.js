import PlantService from "./perenial";

function getPlantByName(plantSearch){
    PlantService.getPlantByName(plantSearch)
        .then(function(response){
            if (response.data){
                printList(response);
            }
            else{
                printError(response);
            }
        });
}

function getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput){
    PlantService.getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput)
    .then(function(response){
        if (response.data){
            printList(response);
        }
        else{
            printError(response);
        }
    });
}

function printList(response) {
    //target div
    const newList = document.createElement(ul);
    
}

function printError(response) {

}