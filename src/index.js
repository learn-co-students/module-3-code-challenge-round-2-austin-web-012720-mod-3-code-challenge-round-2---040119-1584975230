document.addEventListener('DOMContentLoaded', () => {
  getBeers();
});

function getBeers() {
  return fetch('http://localhost:3000/beers')
    .then((response) => response.json())
    .then((json) => {
      renderList(json);
    });
}

function renderList(beers) {
  const beerUl = document.getElementById('list-group');
  beerUl.innerHTML = '';
  beers.forEach((beer) => {
    const beerLi = document.createElement('li');
    beerLi.innerText = beer.name;
    beerLi.setAttribute('class', 'list-group-item');
    beerUl.append(beerLi);
    beerLi.addEventListener('click', (e) => {
      e.preventDefault();
      showBeer(beer);
    });
  });
}

function showBeer(beer) {
  const beerDetails = document.getElementById('beer-detail');
  beerDetails.innerHTML = '';

  // Beer Header
  const beerHeader = document.createElement('h1');
  beerHeader.innerText = beer.name;
  beerDetails.append(beerHeader);

  // Beer Image
  const beerImage = document.createElement('p');
  beerImage.innerHTML = (`<img src = "${beer.image_url}" />`);
  beerDetails.append(beerImage);

  // Beer Tagline
  const beerTagline = document.createElement('h3');
  beerTagline.innerText = beer.tagline;
  beerDetails.append(beerTagline);

  // Beer Description
  const beerDesc = document.createElement('textarea');
  beerDesc.setAttribute('id', 'textarea')
  beerDesc.innerText = beer.description;
  beerDetails.append(beerDesc);

  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.innerText = 'Save';
  editBtn.setAttribute('class', 'btn btn-info');
  editBtn.setAttribute('id', 'edit-beer');
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editBeer(beer);
  });
  beerDetails.append(editBtn);
}

function editBeer(beer) {
  beerTextArea = document.getElementById('textarea');
  const newDesc = {
    method: 'PATCH',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
    body: JSON.stringify({
      description: beerTextArea.value,
    }),
  };
  fetch(`http://localhost:3000/beers/${beer.id}`, newDesc)
    .then((response) => response.json())
    .then((json) => {
      getBeers();
    });
}
