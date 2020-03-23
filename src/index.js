let beers = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchBeers();
})

function fetchBeers(){
  const beerUrl = 'http://localhost:3000/beers/';
  return fetch(beerUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      beers = json;
      addBeers(json);
      console.log(beers);

    })
}

function addBeers(beers){
  const list = document.getElementById('list-group');

  for (let i = 0; i < beers.length; i++){
    console.log(beers[1]);
    let li = document.createElement('li');
    li.className = 'list-group-item';
    // li.innerHTML = `<li class="list-group-item">${beers[i].name}</li> `;
    document.addEventListener("click", function(){
      displayBeer(beers[i]);
    })
    li.appendChild(document.createTextNode(beers[i].name));
    list.appendChild(li);
  }
}

function displayBeer(beer){
  let container = document.querySelector('#beer-detail');
  let name = document.createElement('h1');
  name.innerText = beer.name;
  let img = document.createElement('img');
  img.src = beer.image_url;
  let tag = document.createElement('h3');
  tag = beer.tagline;
  let desc = document.createElement('textarea');
  desc = beer.description;

  container.append(name, img, tag, desc);
}

// edit function -- patch 
