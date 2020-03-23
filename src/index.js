/* eslint-disable no-use-before-define */
const listGroup = document.getElementById('list-group');
let selectedBeer = 'Buzz';
let beerId = 0;
let beerDesc;

document.addEventListener('DOMContentLoaded', () => {
  listGroup.addEventListener('click', targetBeer);
  fetchBeer();
});

function fetchBeer() {
  fetch('http://localhost:3000/beers')
    .then((resp) => resp.json())
    .then((json) => renderBeers(json));
}

function renderBeers(data) {
  listGroup.innerText = '';
  // console.log(selectedBeer);
  data.forEach((beer) => {
    const li = document.createElement('li');
    li.innerText = beer.name;
    listGroup.append(li);
  });
  mainBeer(data, selectedBeer);
}

function targetBeer(event) {
  event.preventDefault();
  selectedBeer = event.target.innerText;
  fetchBeer();
  console.log(selectedBeer);
  event.target.innerText = '';
}

function mainBeer(data, selectedBeer) {
  const beerDetail = document.getElementById('beer-detail');
  beerDetail.innerText = '';
  let beerObj;
  data.forEach((beer) => {
    // console.log(selectedBeer)
    // console.log(beer)
    if (selectedBeer === beer.name) {
      // console.log(beer);
      beerObj = beer;
      beerId = beer.id;
    }
  });
  console.log(beerObj);
  const h1 = document.createElement('h1');
  h1.innerText = beerObj.name;
  beerDetail.append(h1);

  const image = document.createElement('img');
  image.setAttribute('src', beerObj.image_url);
  beerDetail.append(image);

  const h3 = document.createElement('h3');
  h3.innerText = beerObj.tagline;
  beerDetail.append(h3);

  const textArea = document.createElement('textarea');
  textArea.innerText = beerObj.description;
  beerDesc = beerObj.description;
  // textArea.setAttribute('input', 'submit');
  beerDetail.append(textArea);

  const btn = document.createElement('button');
  btn.setAttribute('id', 'edit-beer');
  btn.setAttribute('class', 'btn btn-info');
  // btn.setAttribute('value', 'Save');
  beerDetail.append(btn);
  document.getElementById('edit-beer').addEventListener('click', saveBeerData);
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function saveBeerData(event) {
  event.preventDefault();
  console.log(beerDesc);
  const body = JSON.stringify({
    description: beerDesc,
  });
  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers,
    body,
  });
}




//something is wrong with how I set up the button for the text area, everything should work if I could fix that button