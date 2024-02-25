
/*

// Seleziona l'elemento SVG
let svgElement = document.getElementById('svg');
let letters = svgElement.querySelectorAll('path');

// Funzione per alternare la visibilità delle singole "M" casualmente
function toggleLetterVisibility() {
    
    // Ottieni tutti gli elementi "text" all'interno dell'elemento SVG
    for( let i=0; i<letters.length;i++){

        // Se il numero casuale è inferiore a 0.5, rendi visibile l'elemento, altrimenti rendilo invisibile
        if (i===letters.length) {
            letters[i].style.display = 'inline'; // rendi visibile
        } else {
            letters[i].style.display = 'none';// rendi invisibile
        }
    }
}
   
// Chiama la funzione per alternare la visibilità delle singole "M" casualmente ad intervalli regolari
setInterval(toggleLetterVisibility, 500); // Alterna la visibilità ogni secondo (puoi cambiare l'intervallo come preferisci)
*/