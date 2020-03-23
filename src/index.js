document.addEventListener("DOMContentLoaded", () => {
    const listGroup = elId("list-group")

    function elId(id) {
        return document.getElementById(id)
    };

    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(data => renderBeerList(data))

    function renderBeerList(data) {
        data.forEach(addToBeerList)
    }

    function addToBeerList(beer) {
        const li = document.createElement("li")
        li.className = "list-group-item"
        li.id = beer.id
        li.innerText = beer.name 
        listGroup.append(li)
        li.addEventListener("click", showBeerInfo)
    }

    function showBeerInfo() {
        const beerId = event.target.id

        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(beerData => showBeer(beerData))
    
    
    function showBeer(beerData) {
        const beerDetail = elId("beer-detail")
        const beerCard = document.createElement("div")
        beerCard.innerHTML = `
        <h1>${beerData.name}</h1>
        <img src=${beerData.image_url}>
        <h3>${beerData.tagline}</h3>
        <textarea>${beerData.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
            Save
        </button>
        `
        beerDetail.append(beerCard)
    }
    }
});

// Not updating or persisting text-area input value
    function editDescription() {
        const textArea = document.getElementsByTagName("textarea")[0]
        beerData.description = textArea.value
        
        const saveBtn = elId("edit-beer")
        saveBtn.addEventListener("click", patchReq)
       
    function patchReq(){
     
    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers:  {
            'Content-Type': "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify( {description: textArea.value} )
    })


    
}
}