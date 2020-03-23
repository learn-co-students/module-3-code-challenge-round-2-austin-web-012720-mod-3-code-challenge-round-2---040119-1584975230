document.addEventListener('DOMContentLoaded', () => {

    const beerUrl = "http://localhost:3000/beers"

    fetch(beerUrl)
    .then(r => r.json())
    .then(data => renderBeerData(data))

    const ulList = document.getElementById('list-group')

    function renderBeerData(data){
        data.forEach(beer => {
        const li = document.createElement('li')
        li.classList.add("list-group-item")
        li.innerText = beer.name
        li.setAttribute("data-id", beer.id)
        li.addEventListener('click', fetchBeerInfo)
        ulList.appendChild(li)
        })
    }

    function fetchBeerInfo(e){
       const beerId = e.target.dataset.id
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(r => r.json())
        .then(beer => renderBeerInfo(beer))

    }

    function renderBeerInfo(beer){
        const beerDiv = document.getElementById('beer-detail')
        beerDiv.innerText = ''
        console.log(beer.name)

        const beerName = document.createElement('h1')
        beerName.innerText = beer.name
        beerDiv.appendChild(beerName)

        const image = document.createElement('img')
        image.src = beer.image_url
        beerDiv.appendChild(image)

        const tag = document.createElement('h3')
        tag.innerText = beer.description
        beerDiv.appendChild(tag)

        const form = document.createElement('form')

        const desc = document.createElement('textarea')
        desc.innerText = beer.description
        desc.name = 'desc'
        form.appendChild(desc)


        const button = document.createElement('button')
        button.innerText = 'Save'
        button.id = "edit-beer"
        button.setAttribute('class', 'btn btn-info')
        button.setAttribute("data-id", `${beer.id}`)
        button.addEventListener('click', saveBeer )
        form.appendChild(button)

        beerDiv.appendChild(form)
    }

    function saveBeer(e){
        e.preventDefault();
        console.log(e)
        const beerId = event.target.dataset.id
        console.log(beerId)
        const value = e.target.previousElementSibling.value
       fetch(`http://localhost:3000/beers/${beerId}`, {
           method: "PATCH",
           headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body:  JSON.stringify({
            description: value
          })
       })

    }







    
});