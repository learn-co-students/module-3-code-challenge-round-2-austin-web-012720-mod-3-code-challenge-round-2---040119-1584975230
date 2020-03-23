// Start
const BASE_URL = 'http://localhost:3000'
const BEERS_URL = `${BASE_URL}/beers`

document.addEventListener('DOMContentLoaded', setup)

function setup(e) {
    fetchBeers();
}

/* API functions */
function fetchBeers() {
    fetch(BEERS_URL)
        .then(resp => resp.json())
        .then(beerList => displayBeers(beerList))
}

function displayBeers(beerList) {
    console.log(beerList)
    beerList.forEach(beer => {
        const beerLi = makeBeerNameLi(beer);
        el('list-group').appendChild(beerLi)
    })
}

function makeBeerNameLi(beer) {
    const beerLi = document.createElement('li');
    beerLi.innerText = beer.name;
    beerLi.setAttribute('class', 'list-group-item');

    return beerLi;
}


function el(id) {
    return document.getElementById(id);
}