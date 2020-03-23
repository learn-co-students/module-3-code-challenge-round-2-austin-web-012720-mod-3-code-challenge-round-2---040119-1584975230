let beerDesc;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('Code Challenge Console Log\nDOM is totally Loaded');

  // fetch all data
  fetch('http://localhost:3000/beers/')
    .then(res => res.json())
    .then(data => renderBeerList(data))
});

// render the Beer List on page
function renderBeerList(data) {
  // console.log(data);

  const beerUl = el('list-group');
  
  // loop through data to generate unordered list
  data.forEach(beer => {
    const beerLi = document.createElement('li');
    beerLi.setAttribute('id', beer.id);
    beerLi.setAttribute('class', 'list-group-item')
    beerLi.innerText = beer.name;
    beerUl.appendChild(beerLi);
    beerLi.addEventListener('click', (e) => {
      e.preventDefault();
      // console.log('beer name clicked');
      renderSingleBeer(beer);
    });
  });
};

// render Beer Details on click
function renderSingleBeer(beer) {
  // console.log('In renderSingleBeer function: beer name clicked');
  // console.log(beer);
  el('beer-detail').innerHTML = `
    <h1 id="${beer.id}">${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>
  `;

  el('edit-beer').addEventListener('click', (e) => {
    // console.log('save button clicked, now what buddy?');
    e.preventDefault(); 
    // console.log(document.querySelector('textarea').value);
    console.log(beer.id);

    postBeerDescription(beer);
  });
};

// fn to POST new Beer Description
function postBeerDescription(beer) {
  // console.log(beer.id);
  beerDesc = document.querySelector('textarea').value;
  
  const body = JSON.stringify({
    //  beerDesc: beer.description
    description: beerDesc
  });

  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers,
    body
  });
};

// helper fn to grab element by Id
function el(id) {
  return document.getElementById(id);
};