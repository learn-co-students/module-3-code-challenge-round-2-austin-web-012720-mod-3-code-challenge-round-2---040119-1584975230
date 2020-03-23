//setting global constants of elements that will be utilized in multiple functions
const beerListUl = document.getElementById('list-group')
const beerShowDiv = el('beer-detail')
//setting API source URL constant with / to more easily interpolate :id for single entity fetches
const beerURL = "http://localhost:3000/beers/"

//when page loads, operate function fetch beers. Then, once the promise is returned, render the beer list
document.addEventListener("DOMContentLoaded",() => {
    fetchBeers()
    .then(renderBeerList)
})

//**fetch funtions */
function fetchBeers(){
    //fetch all beers from API and return json object - array of all beers
    return fetch(beerURL)
    .then(resp => resp.json())
}

function fetchOneBeer(beerId){
    //not sure why `beerURL${beerId}` didn't work here, but I would have liked to use that
    //fetch single beer data from API
    //return object of beer data
    return fetch(`http://localhost:3000/beers/${beerId}`)
    .then(resp => resp.json())
}

//**show beer functions */
function renderBeerList(beerList){
    //Sorting through json object [array of all beers] to make an list of them
    beerList.forEach(beer =>{
        //for each beer make an <li> and fill it out appropriately
        const beerLi = document.createElement('li')
        //class Name pulled from readMe
        beerLi.className = "list-group-item"
        //attach id for reference later
        beerLi.setAttribute("data-id", beer.id)
        beerLi.innerText = beer.name
        //attach listener to trigger beer showDiv display
        beerLi.addEventListener("click", showBeer)
        //append to list
        beerListUl.appendChild(beerLi)
    })
}

function showBeer(e){
    //beer id is the id attached to the <li>
    const beerId = e.target.dataset.id
    //get beer data
    fetchOneBeer(beerId)
    //show beer info
    .then(renderBeerDetails)
    
}

function renderBeerDetails(beerData){
    //Empty show panel of any previous beer info that could be there
    beerShowDiv.innerHTML = ""
    
    //create elements (per readMe)
    const name = document.createElement('h1')
    const image = document.createElement('img')
    const tagline =document.createElement('h3')
    const description = document.createElement('textarea')
    const editButton = document.createElement('button')
    
    //fill each element with details
    name.innerText = beerData.name
    image.src = beerData.image_url
    tagline.innerText = beerData.tagline
    description.innerText = beerData.description
    //description id set so the event listener on the update description button has an element to target by id
    description.id = 'description-panel'
    //button name pulled from readMe
    editButton.className = "btn btn-info"
    editButton.innerText = "SAVE"
    //button labeled to find easier
    editButton.id = "edit-beer"
    //set id equal to beer shown for later reference of description update
    editButton.setAttribute('data-id', beerData.id)
    //event listener to update description by clicking button
    editButton.addEventListener("click", editBeerDetails)
    
    //append each element to showpanel
    beerShowDiv.appendChild(name)
    beerShowDiv.appendChild(image)
    beerShowDiv.appendChild(tagline)
    beerShowDiv.appendChild(description)
    beerShowDiv.appendChild(editButton)
    //elements can be appended before or after details are added
}

//**update functions */
function editBeerDetails(e){
    //set id of beer and the description update to values to pass into fetch
    const beerId = e.target.dataset.id
    const description = el('description-panel').value
    
    //fetching with a patch method to update chosen beer with new description
    fetch(`http://localhost:3000/beers/${beerId}`,{
        method: 'PATCH',
        body: JSON.stringify( { description: `${description}`}),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    
    //needless alert button, but I didn't like that there was no way to see you actually updated without refreshing the screen
    window.alert("Beer updated!")
    
}

//**helper functions */
function el(id){
    //nifty function to minimize repeated typing when finding elements by id
    return document.getElementById(id)

}

