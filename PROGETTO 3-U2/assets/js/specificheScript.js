const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhY2M2YTJkN2IxMTAwMTkwZTZkYzIiLCJpYXQiOjE3MDk4ODY1NzAsImV4cCI6MTcxMTA5NjE3MH0.kEOi2NranqbfjVFDEjR6u_0lDBLsg7h9G3KKljeZjoY';

const divSpecifiche = document.getElementById('specifiche');



//Stesso discorso del js del backOffice, mi riprendo i dati con una get, avevo valutato l'opzione local storage ma in ottica rale con una quantità di dati sconosciuta non l'ho ritenuto un metodolo 'prestante' difatti è proprio un copia e incolla, easy.



//Variabili per identificare se c'è la query!!!!
let query = window.location.search;

// Estraggo l'ID dalla query (se prsente) URL
const urlParametro = new URLSearchParams(query);
const urlIdParametro = urlParametro.get('id');

window.addEventListener('load', init);

function init(){
 dettagli();   
}


function dettagli(){
    //Se nel'url c'è la query, l'h1 diventa modifica prodotto, altrimenti rimane invariato. 
    if(query){
   

    // Effettuo la richiesta al server per ottenere i dettagli del prodotto che voglio modificare!
    fetch(`${URL}/${urlIdParametro}`, {
      headers: {
        "Content-Type": "application/json",
          Authorization: API_KEY,
      },
    })
    .then(response => {
      if (response.ok) {
      return response.json();    
      }
      
    })
    
    // Popolo il form con i dettagli del prodotto ottenuti dalla risposta del server....
    .then(product => {
      const  nameModel = product.name;
      const model = product.brand;
      const price = product.price;
      const url = product.imageUrl;
      const description = product.description;
      
    divSpecifiche.innerHTML = `<div class="card d-flex flex-row">
    <div><img src="${url}" class="card-img-top w-100 p-5" alt="${nameModel}"></div>
  <div class="card-body">
    <p class="card-text">${model}</p>
    <h4 class="card-title">${nameModel}</h4>
    <p class="card-text">Prezzo: ${price}€</p>
    <p class="card-text">${description}</p>
  </div>
</div>`;

     
    });
    
    }
    
    };

















