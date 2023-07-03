import PlantService from "./perenial";

function getPlantByName(plantSearch){
    PlantService.getPlantByName(plantSearch)
        .then(function(response){
            if (response.data){
                printList1(response)
                console.log(response);;
            }
            else{
                printError(response);
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
    const newList = document.createElement(ul);
    let newArray = response.data;
    newArray.forEach(function(object) {
        let newListItem = document.createElement(li);
        newListItem.innerText = object.common_name;
        newList.append(newListItem);
    });

}

function printError(response) {

    ///target div
}