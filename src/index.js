let beers = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchBeers();
})

function fetchBeers(){
  let beerUrl = 'http://localhost:3000/beers/';
  return fetch(beerUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      beers = json;
      displayBeers(beers);
    })
}

function displayBeers(beers){
  const list = document.getElementById('list-group');

  for (let i = 0; i < beers.length; i++){
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = beers[i].name;
    li.id = beers[i].id;
    list.appendChild(li);
  }
  document.addEventListener('click', function(event){
    event.preventDefault();
    if (!isNaN(event.target.id)){
      getBeer(event.target.id);
    }
  })
}

function displayBeer(beer){
  const beerContainer = document.querySelector('#beer-detail');

  const name = document.createElement('h1');
  name.innerText = beer.name;

  const image = document.createElement('img');
  image.src = beer.image_url;

  const tag = document.createElement('h3');
  tag.innerText = beer.tagline;

  const desc = document.createElement('textarea');
  desc.innerText = beer.description;

  const save = document.createElement('button');
  save.innerText = 'Save';
  save.className = 'btn btn-info';
  save.value = 'save';

  beerContainer.append(name, image, tag, desc, save);
  save.addEventListener('click', function(event){
    let update = document.querySelector('textarea').value;
    desc.innerText = update
    // send patch 
  })
}

function getBeer(beerId){
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
