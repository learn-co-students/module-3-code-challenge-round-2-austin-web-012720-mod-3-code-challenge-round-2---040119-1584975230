let beers = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchBeers();
  document.addEventListener('click', function(event){
    event.preventDefault();
    getBeer(event.target.id);

  })
})

function fetchBeers(){
  let beerUrl = 'http://localhost:3000/beers/';
  return fetch(beerUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      beers = json;
      addBeers(beers);
    })
}

function addBeers(beers){
  const list = document.getElementById('list-group');

  for (let i = 0; i < beers.length; i++){
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = beers[i].name;
    li.id = beers[i].id;
    list.appendChild(li);
  }
}

function displayBeer(beer){
  let beerContainer = document.querySelector('#beer-detail');

  let name = document.createElement('h1');
  name.innerText = beer.name;

  let image = document.createElement('img');
  image.src = beer.image_url;

  let tag = document.createElement('h3');
  tag = beer.tagline;

  let desc = document.createElement('textarea');
  desc = beer.description;

  beerContainer.append(name, image, tag, desc);
}

function getBeer(beerId){
  // let beer = beers[beerId];
  const beerUrl = `http://localhost:3000/beers/${beerId}`;

  fetch(beerUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      displayBeer(json);
    })
}
// edit function -- patch
