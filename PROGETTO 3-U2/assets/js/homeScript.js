const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhY2M2YTJkN2IxMTAwMTkwZTZkYzIiLCJpYXQiOjE3MDk4ODY1NzAsImV4cCI6MTcxMTA5NjE3MH0.kEOi2NranqbfjVFDEjR6u_0lDBLsg7h9G3KKljeZjoY';

let row = document.getElementById('row');
let contenitore = [];



//Al termine del aricmaento della pagina chiamo la funzione initi che a sua vlta chiama la funzione GET

window.addEventListener('load', init);

//Invoca funzione GET
function init(){
GET();
}
//Fuzione asincrona GET che scarica la base dati ed al termine invoca la funzione popolation(), alla quale viene passato come paramentro il json scaricato.
const GET = async () => {
    try {
      let contentGet = await fetch(URL , {
        method: 'GET',
        headers: {
          Authorization: API_KEY,
        },
      });
      let search = await contentGet.json();
      contenitore = search;
      console.log(search)
      popolation(search);      //Passiamo il parametro "search" che sarebbe il json scaricato con la GET
    }
    catch (error) {
      console.log(error);
    }
  };





//Inizia la funzione popolation, destutturo il json e creo una card in HTML nella quale andro a inserire le porprietà dell'oggetto destrutturato.
  const popolation = async ()=>{
  for (let i = 0; i < contenitore.length; i++) {
    const id = contenitore[i]._id;
    const name = contenitore[i].name;
    const description = contenitore[i].description;
    const brand = contenitore[i].brand;
    const imgUrl = contenitore[i].imageUrl;
    const price = contenitore[i].price;
    const div = document.createElement('div');         //Creo un div nell'html, sul quale anrò ad "appendere" la card con i suo dati destrutturati
    div.classList.add('row');                     
    div.innerHTML= `<div class="card my-2" style="width:18rem; box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.4),
    0px 7px 13px -3px rgba(0,0,0,0.3),
    0px -3px 0px 0px rgba(0,0,0,0.2) inset;" id=${id}>
    <img src="${imgUrl}" class="card-img-top p-2" alt="${name}">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text fw-bold">Brand: ${brand}</p>
      <p class="card-text">${description}</p>
      <p class="card-text">Price: ${price}€</p>
      <a href="back.html?id=${id}" class="btn btn-warning my-1">Modifica</a>
      <a href="specifiche.html?id=${id}" class="btn btn-info">Scopri di più</a>
    </div>
  </div>`;

  row.appendChild(div);

  
  }  
  };






  
