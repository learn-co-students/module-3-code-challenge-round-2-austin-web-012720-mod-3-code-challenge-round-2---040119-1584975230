const editBtn = document.createElement('button')

document.addEventListener("DOMContentLoaded", function(){
    getBeerInfo().then(displayBeers)  
})



function getBeerInfo(){
    return fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
}


function displayBeers(beerInfo){
    const beerList = el("list-group")
    beerList.addEventListener("click", getSingleBeerDetails)
    editBtn.addEventListener("click", postBeerDescription)
    beerInfo.forEach(beer => {
        const beerLi = document.createElement("li")
        beerLi.className = "list-group-item"
        beerLi.id = beer.id
        beerLi.innerText = beer.name
        beerList.append(beerLi)
    })
}

function getSingleBeerDetails(e){
    const beerId = parseInt(e.target.id)
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(resp => resp.json())
    .then(resp => {
        renderSingleBeerDetails(resp);
    })   
}

function renderSingleBeerDetails(singleInfo){
    const beerInfoDiv = el("beer-detail")
    beerInfoDiv.innerText = ''
    
    const beerName = document.createElement('h1')
    const beerImage = document.createElement('img')
    const beerTagline = document.createElement('h3')
    const beerDescription = document.createElement('textarea')
    
    beerName.innerText = singleInfo.name
    beerImage.src = singleInfo.image_url
    beerTagline.innerText = singleInfo.tagline 
    beerDescription.innerText = singleInfo.description
    editBtn.dataset.id = singleInfo.id
    editBtn.innerText = "Save"
    editBtn.id = "edit-beer"
    editBtn.className = "btn btn-info"
    editBtn.addEventListener("click", postBeerDescription)
    
    
    beerInfoDiv.append(beerName)
    beerInfoDiv.append(beerImage)
    beerInfoDiv.append(beerTagline)
    beerInfoDiv.append(beerDescription)
    beerInfoDiv.append(editBtn)

    return beerInfoDiv
}





function postBeerDescription(e){
    console.log(e.target.dataset.id)
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    const newDescription = document.querySelector('textarea').value
    const beerId = e.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({description: newDescription})
    })
}





function el(id){
    return document.getElementById(id)
}