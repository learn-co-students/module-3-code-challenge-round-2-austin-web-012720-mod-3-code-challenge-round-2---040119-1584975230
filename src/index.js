const beerDiv = document.createElement('div');
// const editBeer = document.getElementById('edit-beer')
// console.log(editBeer)
const saveButton = document.getElementById('edit-beer.btn.btn-info')

document.addEventListener("DOMContentLoaded", () => {
    console.log("hey cutie")
    
    fetchBeers();
    
})
function el(id) {
    return document.getElementById(id);
}

function fetchBeers() {
    fetch('http://localhost:3000/beers')
    .then(r => r.json())
    .then(renderBeerList);
}

function renderBeerList(beers) {
    beers.forEach(renderEachBeer);
}

function renderEachBeer(beer) {
    const beerLi = document.createElement('li');
    beerLi.setAttribute('class', 'list-group-item');
    beerLi.setAttribute('data-id', beer.id)
    beerLi.innerText = `${beer.name}`;
    beerLi.addEventListener('click', showSingleBeerDetails);
    el('list-group').append(beerLi);
    //console.log(beerLi)
}

function showSingleBeerDetails(event) {
    //console.log(event.target.dataset.id)
    let beerId = event.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(r => r.json())
    .then(beer => {
        beerDiv.innerHTML = `
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">Save</button>`
    });
    saveButton.addEventListener('submit', editBeerDescription)
    //debugger
    //console.log(beerDiv)
    el('beer-detail').appendChild(beerDiv);
}

function editBeerDescription(event) {
    console.log('Yoooo')
    fetch('http://localhost:3000/beers/${beerId}', {
        method: "PATCH",
        body: JSON.stringify({description: beer.description}),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    })

}