
const beersURL = 'http://localhost:3000/beers';
// const beerList = document.getElementsByClassName('list-group');
// const beerDetail = document.getElementsByClassName('list-group');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  
    fetch(beersURL)
      .then(res => res.json())
      .then(json => renderBeers(json))

});

// el('edit-beer').addEventListener('click', () => {
//   console.log(event);
  
// })

function renderBeers(beers) {
  // console.log(el("list-group"));
  beers.forEach((beer) => {
    let li = document.createElement('li');
    li.setAttribute('className', 'list-group-item');
    li.setAttribute('data-id', beer.id);
    li.textContent = beer.name;
    li.addEventListener('click', fetchBeerInfo);
    el('list-group').appendChild(li);
  });
}

function fetchBeerInfo(event) {
  const beerId = event.target.dataset.id;
  fetch(`${beersURL}/${beerId}`)
  .then((res) => res.json())
  .then((json) => renderBeerInfo(json))
}

function renderBeerInfo(beer) {
  console.log(beer);
  const infoDiv = el('beer-detail');
  infoDiv.innerHTML = `<h1>${beer.name}</h1><img src=${beer.image_url}><h3>${beer.tagline}</h3>
  <h4>First brewed in ${beer.first_brewed}</h4>
  <textarea id="descriptionText">Description: ${beer.description}</textarea>`;
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Save Description';
  editBtn.addEventListener('click', () => {
    const newText = el('descriptionText').value;
    editDescription(beer.id, newText);
  });
  infoDiv.appendChild(editBtn);
  const foodUl = document.createElement('ul');
  foodUl.innerHTML = '<h4>Food Pairings:</h4';
  beer.food_pairing.forEach((food) => {
    const foodLi = document.createElement('li');
    foodLi.innerText = food;
    foodUl.appendChild(foodLi);
  });
  infoDiv.appendChild(foodUl);
}

function editDescription(beerId, newText) {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'applicationjson'
  }

  fetch(`${beersURL}/${beerId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      description: newText
    })
  })
  .then((res => res.json()))
  .then((json) => console.log(json));

}


/* Helper functions */

function el(id) {
  return document.getElementById(id);
}