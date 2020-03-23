
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(json => renderBeers(json));
});


function renderBeers(json){
    const list = el("list-group");
    json.forEach((beer) => {

      const b = document.createElement("li");
      b.innerText = beer.name;
      b.className = "list-group-item";
      b.id = beer.id;
      b.addEventListener("click", (e) => {
        										e.preventDefault();
       										  getDetails(beer.id)});
      list.appendChild(b);
    });


  //  console.log(json);

}

function getDetails(id){
  var url = "http://localhost:3000/beers/" + id;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(json => renderDetails(json));
}

function renderDetails(deets){
  const details = el("beer-detail");
  details.innerHTML = "";

  const title = document.createElement("H1");
  title.innerText = deets['name'];
  const img = document.createElement("IMG");
  img.src = deets["image_url"];
  const tag= document.createElement("H3");
  tag.innerText = deets['tagline'];

  const form = document.createElement("form");
  const desc = document.createElement("textarea");
  desc.innerText = deets['description'];
  desc.id = "desc_input"
  const btn = document.createElement("button")
  btn.innerText = "Save";
  btn.value = "submit";
  btn.className = "btn btn-info"
  form.appendChild(desc);
  form.appendChild(btn);

  form.addEventListener("submit", (e) => {
                        e.preventDefault();
                        var newDesc = document.getElementById("desc_input")
                        postDesc(newDesc,deets['id']);
                      });

  details.append(title);
  details.append(img);
  details.append(tag);
  details.append(form);
  console.log(deets);


}

function postDesc(desc,id){
  //(desc.placeholder);
  fetch(`http://localhost:3000/beers/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    description: desc.value
  }),
  headers: {
    'Content-Type': 'application/json'
    }
  })
}

function el(id) {
  return document.getElementById(id);
}
