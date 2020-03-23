const BEERS_URL = 'http://localhost:3000/beers';

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    fetchBeers(BEERS_URL);
});

function fetchBeers(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(json => beersHTML(json));
};

function beersHTML(beers) {
    console.log(beers);
    const ul = el('list-group');

    for(const beer in beers) {
        const name = beers[beer].name;
        const id = beers[beer].id;
        
        const li = create('li');
        li.innerText = name;
        li.dataset.beerId = id;
        li.addEventListener("click", beerDetail);
        ul.appendChild(li);
    }
};

function beerDetail(event) {
    const id = event.target.dataset.beerId;

    fetch(`${BEERS_URL}/${id}`)
    .then(resp => resp.json())
    .then(json => beerHTML(json));
};

function beerHTML(beer) {
    const div = el('beer-detail');
    
    div.innerHTML = `<h1>${beer.name}</h1>
    <img src="">
    <h3>${beer.tagline}</h3>
    <textarea data-description-id="${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-edit-beer-id="${beer.id}">
      Save
    </button>`;

    const button = document.querySelector(`button[data-edit-beer-id="${beer.id}"]`);
    button.addEventListener("click", saveDescription);
    console.log(button);
}

function saveDescription(event) {
    //event.preventDefault();
    const id = event.target.dataset.editBeerId;
    const textarea = event.target.previousElementSibling;
    const description = textarea.value;
    
    const body = {
        description: description
    };

    const configObj = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };

    fetch(`${BEERS_URL}/${id}`, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json));
};

function el(id) {
    return document.getElementById(id);
};

function create(element) {
    return document.createElement(element);
};


