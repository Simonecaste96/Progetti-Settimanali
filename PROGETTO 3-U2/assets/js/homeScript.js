const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhY2M2YTJkN2IxMTAwMTkwZTZkYzIiLCJpYXQiOjE3MDk4ODY1NzAsImV4cCI6MTcxMTA5NjE3MH0.kEOi2NranqbfjVFDEjR6u_0lDBLsg7h9G3KKljeZjoY';

let row = document.getElementById('row');
let contenitore = [];





window.addEventListener('load', init);


function init(){
get();
}

const get = async () => {
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
      popolation(search);
    }
    catch (error) {
      console.log(error);
    }
  };

  const popolation = async ()=>{
  for (let i = 0; i < contenitore.length; i++) {
    const id = contenitore[i]._id;
    const name = contenitore[i].name;
    const description = contenitore[i].description;
    const brand = contenitore[i].brand;
    const imgUrl = contenitore[i].imageUrl;
    const price = contenitore[i].price;
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML= `<div class="card" style="width: 18rem; id=${id}">
    <img src="${imgUrl}" class="card-img-top" alt="${name}">
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




  const put = async () => {
    try {
      let content = await fetch(URL , {
        method: 'PUT',
        headers: {
          Authorization: API_KEY,
        },
      });
      let search = await content.json();
      console.log(search)
    }
    catch (error) {
      console.log(error);
    }
  };
  
