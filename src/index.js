
const BEERURL= "http://localhost:3000/beers"
let id;

document.addEventListener("DOMContentLoaded", () => {
    
    
    fetch(BEERURL)
        .then(resp => resp.json())
        .then(data => renderBeers(data))

})

/* Event Handlers */

const handleSaveClick = (e) => {
    if (e.target.id === "edit-beer"){
        console.log("HEY ITS TWERKING!")
        const descriptionInput = el("description-box")
        console.log(descriptionInput.value)

        fetch(BEERURL + `/${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: descriptionInput.value
            })

        })
        .then(resp => resp.json())
        .then(data => renderSingleBeer(data))          
    
    }

}



/* Render Functions */
const handleBeerClick = (id) => {
    console.log('I WAS CLICKED! HOORAY!')
    console.log(BEERURL + `/${id}`)
    fetch(BEERURL + `/${id}`)
    .then(resp => resp.json())
    .then(data => renderSingleBeer(data))    
}

const renderSingleBeer = (beer) => {
    console.log(beer);
    const container = el('beer-detail');

    container.innerHTML = ''

    let title = document.createElement('h1');
    title.innerText = beer.name;
    container.append(title);

    let image = document.createElement('img');
    image.src = (beer.image_url);
    container.append(image);
    // image.setAttribute('src', beer.image_url)

    let tagLine = document.createElement('h3');
    tagLine.innerText = beer.tagline;
    container.append(tagLine);

    let textArea = document.createElement('textarea');
    textArea.id="description-box"
    textArea.innerText = beer.description;
    container.append(textArea);

    let editBtn = document.createElement('button');
    editBtn.id = ("edit-beer");
    editBtn.className = ("btn btn-info");
    editBtn.innerText = ("Save") 
    container.append(editBtn)
    editBtn.addEventListener("click", (e) => handleSaveClick(e))
}


const renderBeers = (data) => {
    
    const list = el("list-group")
//<a href="https://www.w3schools.com">Visit W3Schools.com!</a>
//<button type="button">Click Me!</button>


    data.forEach(beer => {
        let li = document.createElement("li")
        li.className = ("list-group-item")
        // li.innerText = beer.name
        li.innerHTML += `<button id="thisBeer" type="button" name="beer" data-action="clicked-beer" data-beer="${beer.id}"> ${beer.name}</button>`
        // li.onclick = handleBeerClick(beer.id)
        list.append(li)
        const thisBeer = document
    });
    list.addEventListener("click", (e) => {
        if(e.target.dataset.action === "clicked-beer"){
            handleBeerClick(e.target.dataset.beer)
            console.log(e.target.dataset.beer)
            id = e.target.dataset.beer
        }
    })

    console.log(data);

}

const el = (id) => {
    return document.getElementById(id);
}