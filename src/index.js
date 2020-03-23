// Start
const BASE_URL = 'http://localhost:3000'
const BEERS_URL = `${BASE_URL}/beers`

//let beerList = [];

document.addEventListener('DOMContentLoaded', setup)

function setup(e) {
    fetchBeerList();
}

/* API functions */
function fetchBeerList() {
    fetch(BEERS_URL)
        .then(resp => resp.json())
        .then(beerList => {
            //beerList = jsonBeerList; 
            displayBeerList(beerList)
        });
}

function fetchBeer(beerId) {
    fetch(`${BEERS_URL}/${beerId}`)
        .then(resp => resp.json())
        .then(beerInfo => displayBeer(beerInfo))
}

function patchBeer(beerId, newDescription) {
    // console.log("patch ", beerId, newDescription)
    fetch(`${BEERS_URL}/${beerId}`,{
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({description: newDescription})
    })
    
}

/* Display functions */
function displayBeerList(beerList) {
    // console.log(beerList)
    beerList.forEach(beer => {
        const beerLi = makeBeerNameLi(beer);
        el('list-group').appendChild(beerLi)
    })
}

function displayBeer(beer) {
    const beerDiv = el('beer-detail');
    const nameEl = document.createElement('h1');
    const imageEl = document.createElement('img');
    const taglineEl = document.createElement('h3');
    const descriptionArea = document.createElement('textarea');
    const buttonEl = document.createElement('button');

    nameEl.innerText = beer.name;
    imageEl.src = beer.image_url;
    taglineEl.innerText = beer.tagline;
    descriptionArea.innerText = beer.description;
    descriptionArea.id = 'beer-description';
    buttonEl.id = 'edit-beer';
    buttonEl.class = 'btn btn-info';
    buttonEl.innerText = 'Save';
    buttonEl.addEventListener('click', e => {
        // console.log("Value: ", descriptionArea.value)
        // console.log('innerText: ', descriptionArea.innerText)
        //console.log(beerList[beer.id])
        //beerList[beer.id].description = descriptionArea.value;
        patchBeer(beer.id, descriptionArea.value);
    });

    beerDiv.appendChild(nameEl);
    beerDiv.appendChild(imageEl);
    beerDiv.appendChild(taglineEl);
    beerDiv.appendChild(descriptionArea);
    beerDiv.appendChild(buttonEl);
}

/* Button handlers */
// function handleSaveBeerDescription(e) {
//     // e.preventDefault();

//     patchBeer(el('beer-descpription'))

//     displayBeer()
// }

/* Make DOM elements */

function makeBeerNameLi(beer) {
    const beerLi = document.createElement('li');
    beerLi.innerText = beer.name;
    beerLi.setAttribute('class', 'list-group-item');
    beerLi.setAttribute('data-beer-id', beer.id)
    
    beerLi.addEventListener('click', e => {
        const beerEl = el('beer-detail');
        beerEl.innerHTML = '';
        fetchBeer(beer.id)
        // displayBeer(beerList[beer.id]);
    })
    return beerLi;
}



function el(id) {
    return document.getElementById(id);
}