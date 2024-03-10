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
const del = document.getElementById('del');



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



async function pageMod() {
  //Se nel'url c'è la query, parte la funzione e scarico i dati da gestire. 
 if(query){

//Dato che ho cliccato su modifica, l'h1 cambia e creo anche il button Elimina prodotto per la function DELETE, in modo da gestire direttamente il prodotto selezionato!
 h1.innerText = 'Modifica prodotto';
 save.innerText = 'Salva le modifiche';
 del.style.display = 'inline';



// Effettuo la richiesta al server per ottenere i dettagli del prodotto che voglio modificare!
  try {
    const response = await fetch(`${URL}/${urlIdParametro}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    });
    if (response.ok) {
      console.log('Richiesta dettagli prodotto effettuata con successo!')
    }
    else {
      console.log('Errore nella richiesta dettagli prodotto: ' + response.status);
    }

    const product = await response.json();

    // Popola il form con i dettagli del prodotto ottenuti dalla risposta del server...
    nameBack.value = product.name;
    modelBack.value = product.brand;
    priceBack.value = product.price;
    urlBack.value = product.imageUrl;
    descriptionBack.value = product.description;

  } catch (error) {
    console.error('Errore durante la richiesta dei dettagli del prodotto: ' + error);
  }
}
};




// function pageMod(){
// //Se nel'url c'è la query, parte la funzione e scarico i dati da gestire. 
// if(query){

//  //Dato che ho cliccato su modifica, l'h1 cambia ma creo anche il button Elimina prodotto per la function DELETE, in modo da gestire direttamente il prodotto selezionato!
// h1.innerText = 'Modifica prodotto';
// save.innerText = 'Salva le modifiche'
// del.innerText = 'Elimina prodotto dalla base dati'
// form.appendChild(del)



// // Effettuo la richiesta al server per ottenere i dettagli del prodotto che voglio modificare!
// fetch(`${URL}/${urlIdParametro}`, {
//   headers: {
//     "Content-Type": "application/json",
//       Authorization: API_KEY,
//   },
// })
// .then(response => {
//   if (response.ok) {
//   return response.json();    
//   }
  
// })

// // Popolo il form con i dettagli del prodotto ottenuti dalla risposta del server....
// .then(product => {
  
//   nameBack.value = product.name;
//   modelBack.value = product.brand;
//   priceBack.value = product.price;
//   urlBack.value = product.imageUrl;
//   descriptionBack.value = product.description;
// });

// }

// };





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

});








//Se decido di cancellare il prodotto nessun problema, il click avvia la funzione DELETE
del.addEventListener('click', function (e){
e.preventDefault();
let conferma = window.confirm("Sei sicuro? Il prodotto non sarà più recuperabile!")
if(conferma){
DELETE(urlIdParametro);
h1.innerText = 'Prodotto eliminato!'
}

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
      h1.innerText = 'Prodotto aggiunto!';
      console.log('Richiesta POST effettuata con successo!');
    }
    else {
      h1.innerText = 'Ops.. qualcosa è andato storto!! ' + contentPOST.status;
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
      h1.innerText = 'Prodotto modificato!';
      console.log('Richiesta PUT effettuata con successo!');
    }
    else {
      h1.innerText = 'Ops.. qualcosa è andato storto!! ' + contentPUT.status;
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
      h1.innerText = 'Prodotto eliminato!';
      console.log('Richiesta DELETE effettuata con successo!');
    }
    else {
      h1.innerText = 'Ops.. qualcosa è andato storto!! ' + contentDELETE.status;
      console.log('Errore nella richiesta DELETE: ' + contentDELETE.status);
    }
  }
  catch (error) {
    console.log('Errore nella richiesta DELETE: ' + error);
  }
};






// //Funzione che resetta il form
// function dell() {
//   nameBack.value = ''; 
//   modelBack.value = ''; 
//   priceBack.value = ''; 
//   urlBack.value = ''; 
//   descriptionBack.value = ''; 
// }