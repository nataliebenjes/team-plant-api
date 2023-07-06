import PlantService from "./perenial";
import './css/styles.css';
import MapSearch from "./map_api";


// Fetch response from API via query search
function getPlantByName(plantSearch) {
    PlantService.getPlantByName(plantSearch)
        .then(function (response) {
            if (response.data) {
                printList(response);
            } else {
                printError(response);
            }
        });
}

//Fetch response from API via criteriaSearch
function getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput) {
    PlantService.getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput)
        .then(function (response) {
            if (response.data) {
                printList(response);
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
    if (response.total === 0) {
        //Prints Error if 0 result
        let error = document.createElement('small');
        error.innerText = 'Error, your search was not found.';
        document.querySelector('.search-results').appendChild(error);
    }
    //Check validation and display results in the DOM
    newArray.forEach(function (object) {
        //Filter premium results
        if (object.cycle.includes('Upgrade')) {
            object = '';
        } else {
            //Create elements with the plant data
            if (!plantNames.has(object.common_name)) {
                let cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                <div id="${object.common_name}-wrapper">
                <label for="${object.id}"><input class="hidden-checkbox" id="${object.id}" type="checkbox">${object.common_name}</label>
                </div>
                `;
                //Display the results in the DOM
                document.querySelector('.search-results').appendChild(cardDiv);
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
            .then(function (response) {
                if (response) {
                    createPlantName(response);
                } else {
                    printError(response);
                }
            });

        let mapElement = document.querySelector('.display-map');
        mapElement.innerHTML = `
        <iframe src="https://perenual.com/api/hardiness-map?key=${process.env.API_KEY}&species_id=${e.target.id}" width="100%" height="300";">
        </iframe>
        `;
    });
}

//function that will print an error message if API call didn't work
function printError(response) {
    let error = document.createElement('small');
    error.innerText = `Error, there was an issue with your search call: ${response}`;
    document.querySelector('.search-results').appendChild(error);
}

function createPlantName(response) {
    // Ensure response object and required properties exist
    if (response && response.common_name && response.description && response.default_image && response.default_image.medium_url) {
        let displayName = document.querySelector('.display-name');
        displayName.innerHTML =
            `<h3 class ="display-name-h">${response.common_name}</h3>
            <p class ="display-name-p">${response.description}</p>
            <img class ="display-name-img" src="${response.default_image.medium_url}" alt="${response.common_name}">`;
    } else {
        console.error('Invalid response object:', response);
    }
}

//form for name search
function handlePlantSearch(event) {
    event.preventDefault();
    //Empty the container
    document.querySelector('#allResults').removeAttribute('class');
    document.querySelector('.search-results').innerHTML = '';
    document.querySelector('.display-name').innerHTML = '';

    let plantName = document.getElementById('plantName');
    let plantNameValue = plantName.value;
    console.log(plantNameValue);

    //Pass the input user into the fetch API
    getPlantByName(plantNameValue);
}

//form for criteria search
function handleCriteriaSearch(event) {
    event.preventDefault();
    //Empty the container
    document.querySelector('#criteriaHidden').removeAttribute('class');
    document.querySelector('.search-results').innerHTML = '';
    document.querySelector('.display-name').innerHTML = '';

    let sunlightInput = document.getElementById('sunlight').value;
    let wateringInput = document.getElementById('watering').value;
    let cycleInput = document.getElementById('cycle').value;

    console.log(cycleInput, sunlightInput, wateringInput);

    //Pass the input user into the fetch API
    getPlantListFromSelectors(cycleInput, sunlightInput, wateringInput);

}


// Business Logic
function postalCodeSearch(city, zipcode) {
    let promise = MapSearch.postalCodeSearch(city, zipcode);
    promise.then(function (getLonLat) {
        // printElements(getLonLat, city, zipcode);
        const coordArray = getLonLat.resourceSets[0].resources[0].point.coordinates
        console.log(coordArray);
        const coordString = coordArray.join(', ');
        console.log(coordString);
        nurserySearchTwo(coordString);
    }, function (errorArray) {
        printMapError(errorArray);
    });
}

// function staticMap(coordString2) {
//     let promise = MapSearch.nurserySearchTwo(coordString2);
//     promise.then(function (response) {
//         console.log(response);
//     })
// }

function nurserySearchTwo(coordString) {
    let promise = MapSearch.nurserySearchTwo(coordString);
    promise.then(function (info) {
        console.log(info.resourceSets[0]);
        printElements(info.resourceSets[0].resources);
        // const coordArray2 = info.resourceSets[0].resources.geocodePoints[0].coordinates;
        console.log(info.resourceSets[0].resources.geocodePoints[0].coordinates)
        // const coordString2 = coordArray2.join(', ');
        // staticMap(coordString2);
    }, function (errorArray) {
        printMapError(errorArray);
    });
}


function printMapError(apiResponse) {
    document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.statusDescription} with ${apiResponse.errorDetails}`;
}

function printElements(info) {
    console.log(info);
    let showResponseElement = document.querySelector('.display-name');
    showResponseElement.innerHTML = ''; // Clear the content before appending
    for (let i = 0; i < 5; i++) {
        const websiteLink = `<a href="${info[i].Website}" target="_blank">${info[i].Website}</a>`;
        showResponseElement.innerHTML += `
        
        <h1>${info[i].name}<h1>
        <ul>
        <li>Phone number: ${info[i].PhoneNumber}</li>
        <li>Buisness Address: ${info[i].Address.addressLine}</li>
        <li>Website: ${websiteLink}</li>
        </ul>
        <br>`;
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    const city = document.querySelector('#city').value;
    document.querySelector('#city').value = null;
    const zipcode = document.querySelector('#zipcode').value;
    document.querySelector('#zipcode').value = null;
    postalCodeSearch(city, zipcode);
    console.log(city, zipcode);
}

//Event listener
if (document.querySelector("#plantSearch")) {
    document.querySelector("#plantSearch").addEventListener("submit", handlePlantSearch);
} else if (document.querySelector("#criteriaSearch")) {
    document.querySelector("#criteriaSearch").addEventListener("submit", handleCriteriaSearch);
} else if (document.querySelector('#nurserySearch')) {
    document.querySelector("#nurserySearch").addEventListener("submit", handleFormSubmission);
}
