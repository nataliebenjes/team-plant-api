import PlantService from "./perenial";

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

function printList(response) {
    const newList = document.createElement("ul");
    let newArray = response.data;
    let plantNames = new Set();

    if(response.total === 0) {
        let error = document.createElement('small');
        error.innerText = 'Error, your search is not found';
        document.getElementById('nursery-results').appendChild(error);
    }

    newArray.forEach(function(object) {
        if (object.cycle.includes('Upgrade')){
            object = '';
        } else {
            if (!plantNames.has(object.common_name)) {
                let cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                <div id="${object.common_name}-wrapper">
                <input class="hidden-checkbox" id="${object.id}" type="checkbox">
                <label for="${object.id}">${object.common_name}</label>
                </div>
                `;
                document.getElementById('nursery-results').appendChild(cardDiv);
                setupCheckboxListener(object.id); // This sets up the listener for the newly created checkbox
                plantNames.add(object.common_name);
            }
        }
    });

    document.getElementById('nursery-results').appendChild(newList);
}

function setupCheckboxListener(id) {
    const checkbox = document.getElementById(id);
    checkbox.addEventListener('click', function (e) {
        PlantService.getPlantInfo(e.target.id);
        
    });
}

function handlePlantSearch(event) {
    event.preventDefault();
    let plantName = document.getElementById('plantName');
    let plantNameValue = plantName.value;
    console.log(plantNameValue);

    getPlantByName(plantNameValue);
}


document.querySelector("#plantSearch").addEventListener("submit", handlePlantSearch);