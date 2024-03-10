const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhY2M2YTJkN2IxMTAwMTkwZTZkYzIiLCJpYXQiOjE3MDk4ODY1NzAsImV4cCI6MTcxMTA5NjE3MH0.kEOi2NranqbfjVFDEjR6u_0lDBLsg7h9G3KKljeZjoY';

const save = document.getElementById('save');
const nameBack = document.getElementById('name');
const modelBack = document.getElementById('model');
const priceBack = document.getElementById('price');
const urlBack = document.getElementById('url');
const descriptionBack = document.getElementById('description');
const form = document.getElementById('form');
const h1 = document.getElementById('h1');
const del = document.createElement('button');



//Attendo il caricamento della pagina, ed avvio init
window.addEventListener('load', init );

//Variabili per identificare se c'è la query!!!!
let query = window.location.search;

// Estraggo l'ID dalla query (se prsente) URL
const urlParametro = new URLSearchParams(query);
const urlIdParametro = urlParametro.get('id');

//Avvia pageMod
function init(){
  pageMod();
}








function pageMod(){
//Se nel'url c'è la query, l'h1 diventa modifica prodotto, altrimenti rimane invariato. 
if(query){

 //Dato che ho cliccato su modifica, l'h1 cambia ma creo anche il button Elimina prodotto per la function DELETE, in modo da gestire direttamente il prodotto selezionato!
h1.innerText = 'Modifica prodotto';
save.innerText = 'Salva le modifiche'
del.innerText = 'Elimina prodotto dalla base dati'
form.appendChild(del)



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
  
  nameBack.value = product.name;
  modelBack.value = product.brand;
  priceBack.value = product.price;
  urlBack.value = product.imageUrl;
  descriptionBack.value = product.description;
});

}

};





//Faccio rimanere in ascolto il bottone salva, al click parte la funzione POST oppure la PUT!
save.addEventListener('click', function (e) {
  e.preventDefault();
  let nameValue = nameBack.value;
  let modelValue = modelBack.value;
  let priceValue = priceBack.value;
  let urlValue = urlBack.value;
  let descriptionValue = descriptionBack.value;
  const data = {

    "name": `${nameValue}`,
    "brand": `${modelValue}`,
    "imageUrl": `${urlValue}`,
    "price": `${priceValue}`,
    "description": `${descriptionValue}`

  };
 //SE L'h1 è rimasto invariato sia parte con la POST altrimenti... PUT! 
if(h1.innerText == 'Aggiungi prodotto'){
POST(data); 
   
}
  else{
    PUT(urlIdParametro, data);  
  }
//All'invio del form resetto tutto!
dell();
});








//Se decido di cancellare il prodotto nessun problema, il click avvia la funzione DELETE
del.addEventListener('click', function (e){
e.preventDefault();
DELETE(urlIdParametro);

});




//Funzione POST, passo i dati come parametri e parte!
const POST = async (a) => {

  try {
    const contentPOST = await fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify(a)
    });
    if (contentPOST.ok) {
      console.log('Richiesta POST effettuata con successo!')
    }
    else {
      console.log('Errore nella richiesta POST: ' + contentPOST.status);
    }

  }
  catch (error) {
    console.log('Errore nella richiesta POST: ' + error);
  }
};




//Funzione PUT, gli passo i parametri da sopra, la impacchetto(con il fiocco) e la faccio partire!!!

const PUT = async (id, data) => {

  try {
     const contentPUT = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
   
    if (contentPUT.ok) {
      console.log('Richiesta PUT effettuata con successo!')
    }
    else {
      console.log('Errore nella richiesta PUT: ' + contentPUT.status);
    }
  }
  catch (error) {
    console.log('Errore nella richiesta PUT: ' + error);
  }
};



//Passo le info dai parametri, stessa cosa della PUT!!!
const DELETE = async (id) => {

  try {
     const contentDELETE = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json'
      }
      
    });
   
    if (contentDELETE.ok) {
      console.log('Richiesta DELETE effettuata con successo!')
    }
    else {
      console.log('Errore nella richiesta DELETE: ' + contentDELETE.status);
    }
  }
  catch (error) {
    console.log('Errore nella richiesta DELETE: ' + error);
  }
};






//Funzione che resetta il form
function dell() {
  nameBack.value = ''; 
  modelBack.value = ''; 
  priceBack.value = ''; 
  urlBack.value = ''; 
  descriptionBack.value = ''; 
}