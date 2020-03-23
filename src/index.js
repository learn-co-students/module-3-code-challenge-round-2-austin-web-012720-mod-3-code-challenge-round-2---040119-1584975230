const beersURL = 'http://localhost:3000/beers/';
let beersInfo = [];

function changeDescription(beer, description) {
  fetch(beersURL + beer.id, {
    method: 'PATCH',
    body: JSON.stringify({
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

function renderBeerDetails(beer) {
  const details = document.getElementById('beer-detail');
  details.innerHTML = '';

  const name = document.createElement('h1');
  name.innerText = beer.name;
  details.append(name);

  const img = document.createElement('img');
  img.src = beer.image_url;
  details.append(img);

  const tagline = document.createElement('h3');
  tagline.innerText = beer.tagline;
  details.append(tagline);

  const description = document.createElement('textarea');
  description.innerText = beer.description;
  details.append(description);

  const edit = document.createElement('button');
  edit.id = 'edit-beer';
  edit.innerText = 'Save';
  edit.addEventListener('click', () => {
    const newDesc = document.getElementsByTagName('textarea')[0].value;
    changeDescription(beer, newDesc);
  });

  details.append(edit);
}

function getBeerInfo(beer) {
  fetch(beersURL + beer.id)
    .then(resp => resp.json())
    .then(json => renderBeerDetails(json));
}

function renderBeerList(beerList) {
  const list = document.getElementById('list-group');

  beerList.forEach(beer => {
    const newBeer = document.createElement('li');
    newBeer.className = 'list-group-item';
    newBeer.addEventListener('click', () => {
      getBeerInfo(beer);
    });
    newBeer.appendChild(document.createTextNode(beer.name));

    list.appendChild(newBeer);
  });
}

function getBeers() {
  fetch(beersURL)
    .then(resp => resp.json())
    .then(json => {
      beersInfo = [];
      json.forEach(beer => {
        beersInfo.push(beer);
      });
      renderBeerList(beersInfo);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getBeers();
});
