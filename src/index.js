document.addEventListener("DOMContentLoaded", function(){
    getBeerInfo().then(displayBeers)
    
 })
 
 
 
 function getBeerInfo(){
     return fetch("http://localhost:3000/beers")
         .then(resp => resp.json())
 }
 
 
 
 
 
 
 function displayBeers(beerInfo){
     const beerList = el("list-group")
     beerList.addEventListener("click", renderBeerInfo)
     beerInfo.forEach(beer => {
         const beerLi = document.createElement("li")
         beerLi.className = "list-group-item"
         beerLi.id = beer.id
         beerLi.innerText = beer.name
         beerList.append(beerLi)
     })
 }
 
 function renderBeerInfo(e){
     const beerInfoDiv = el("beer-detail")
     const beerId = e.target.id
     fetch(`http://localhost:3000/beers/${beerId}`)
     .then(resp => resp.json())
     .then(resp => {
         
         const beerInfoDiv = el('beer-detail')
         let beerName = document.createElement('h1')
         let beerImage = document.createElement('img')
         let beerTagline = document.createElement('h2')
         
         beerName.innerText = beerDeets.name
         beerImage.img = beerDeets.image_url
         beerTagline.innerText = beerDeets.tagline
     
         beerInfoDiv.append(beerName)
     })
     
 
 }   
 
 function el(id){
     return document.getElementById(id)
 }