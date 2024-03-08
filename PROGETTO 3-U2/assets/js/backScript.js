const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhY2M2YTJkN2IxMTAwMTkwZTZkYzIiLCJpYXQiOjE3MDk4ODY1NzAsImV4cCI6MTcxMTA5NjE3MH0.kEOi2NranqbfjVFDEjR6u_0lDBLsg7h9G3KKljeZjoY';

const save = document.getElementById('save');
const nameBack = document.getElementById('name');
const modelBack = document.getElementById('model');
const priceBack = document.getElementById('price');
const urlBack = document.getElementById('url');
const descriptionBack = document.getElementById('description');
const form = document.getElementById('form');




//Inizia la POST
const post = async (a) => {

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



//Faccio rimanere in ascolto il bottone salva, al click parte la funzione POST
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

  post(data);
});

function dell() {
  form.reset()
}




