// Start
const BASE_URL = 'http://localhost:3000'
const BEERS_URL = `${BASE_URL}/beers`

document.addEventListener('DOMContentLoaded', setup)

function setup(e) {
    fetchBeerList();
}

/* API functions */
function fetchBeerList() {
    fetch(BEERS_URL)
        .then(resp => resp.json())
        .then(beerList => displayBeerList(beerList))
}

// function fetchBeer(beerId) {
    
// }

/* Display functions */
function displayBeerList(beerList) {
    // console.log(beerList)
    beerList.forEach(beer => {
        const beerLi = makeBeerNameLi(beer);
        el('list-group').appendChild(beerLi)
    })
}



// function displayBeer(beer) {
    
// }

function makeBeerNameLi(beer) {
    const beerLi = document.createElement('li');
    beerLi.innerText = beer.name;
    beerLi.setAttribute('class', 'list-group-item');
    beerLi.setAttribute('data-beer-id', beer.id)
    
    beerLi.addEventListener('click', e => {
        const beerEl = el('beer-detail');
        beerEl.innerHTML = '';

        makeBeerEl(beer);
    })
    return beerLi;
}

function makeBeerEl(beer) {
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
    buttonEl.id = 'edit-beer';
    buttonEl.class = 'btn btn-info';
    buttonEl.innerText = 'Save';

    beerDiv.appendChild(nameEl);
    beerDiv.appendChild(imageEl);
    beerDiv.appendChild(taglineEl);
    beerDiv.appendChild(descriptionArea);
    beerDiv.appendChild(buttonEl);
}

function el(id) {
    return document.getElementById(id);
}