let beers ;
document.addEventListener('DOMContentLoaded', ()=>{
  console.log('Heyo!')
  getBeers();


})


function addBeerNames(){
  for(const i in beers){
    let ul = el('list-group');
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item');
    li.innerText = beers[i].name
    li.addEventListener('click',()=>{
      let div = el('beer-detail');
      div.innerHTML = `<h1>${beers[i].name}</h1>
      <img src="${beers[i].image_url}">
      <h3>${beers[i].tagline}</h3>
      <textarea id='des'>${beers[i].description}</textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>`;
      let btn = el('edit-beer')
      btn.addEventListener('click', ()=>{
        let des = el('des').value
        editBeer(beers[i],des)
      })
    })

    ul.appendChild(li)

  }
}
function getBeers(){
  fetch('http://localhost:3000/beers')
  .then(r=>r.json())
  .then(json => {
    beers = json;
      addBeerNames();
  })
}
function editBeer(beer,des){
  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers:  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    description: des
  })
  })
}

function el(id){
 return   document.getElementById(id);
}
