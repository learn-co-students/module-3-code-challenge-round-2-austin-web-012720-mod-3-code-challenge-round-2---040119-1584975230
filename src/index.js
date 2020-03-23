let beers;

document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM Loaded')
  fetchBeers()
    .then(results => {
        beers = results;
        renderBeerList();
    })
});

function fetchBeers() {
    return fetch('http://localhost:3000/beers')
      .then(response => response.json())
};

function renderBeerList() {
  const beerListContainer = document.getElementById('list-group');
  beers.forEach(beer => {
    let li = renderOneBeer(beer);
    beerListContainer.appendChild(li);    
  })
};

function renderOneBeer(beerObject) {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-group-item');
  li.id = beerObject.id;
  li.innerText = beerObject.name;
  
  li.addEventListener('click', fetchIndividualBeer);
  return li;  
};

function fetchIndividualBeer(event) {
    const beerId = event.target.id;
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(response => response.json())
      .then(results => {
          //console.log(results)
          showBeer(results)
        })
};

function showBeer(beerObject) {
  const beerDiv = document.getElementById('beer-detail');
  beerDiv.innerHTML = '';
  const div = document.createElement('div');
  div.id = beerObject.id;
  div.innerHTML = `<h1>${beerObject.name}</h1>
                       <img src=${beerObject.image_url}>
                       <h3>${beerObject.tagline}</h3>
                       <textarea>${beerObject.description}</textarea>
                       <button id="edit-beer" class="btn btn-info">
                          Save
                       </button>`;
  const button = div.querySelector('button');
  button.addEventListener('click', editBeer);
  beerDiv.appendChild(div);       
};

function editBeer() {
  const beerId = event.target.parentNode.id;
  let newDescription = event.target.previousElementSibling.value;

  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: newDescription})    
  })
    .then(response => response.json())
    //.then(results => console.log(results))   
};

