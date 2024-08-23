/* mostrar personajes sin filtrar
obtener todos los personajes
renderizarlos en las tarjetas
al cambiar los filtros se tiene que hacer un nuevo llamado a la api
 */

const characterEl = document.getElementById("characters");
const nameFilterEl = document.getElementById("name-filter");
const statusFilterEl = document.getElementById("status-filter");

//crear funcion que haga el llamado a la API con algo llamado "promesa"

async function getCharacters(name, status){
    let url = 'https://rickandmortyapi.com/api/character/';

    if(name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }
        if(status){
            url += `status=${status}`;
        }
    }

    const response = await fetch(url);
    const data = await response.json();

    //console.log(data.results);

    return data.results;
}

//getCharacters();

//funcion que renderiza los elementos dentro del dom
async function displayCharacters(name, status) {
    //obtener los personajes filtados
    const characters = await getCharacters(name, status);

    characterEl.innerHTML = '';
    //renderizar personajes
    for( let character of characters ){
        const card = document.createElement("div");
        card.classList.add('character-card');

        //console.log(`Cadena de caracteres ${character.name}`);
        card.innerHTML = `
            <img src = "${character.image}" />
            <h2> ${character.name} </h2>
            <p> Status: ${character.status} </p>
            <p> Especie: ${character.specie} </p>
            <p> Gender: ${character.gender} </p>
        `;

        characterEl.appendChild(card);
    }
}
displayCharacters();

nameFilterEl.addEventListener('input', () =>{
    displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

statusFilterEl.addEventListener('change', () =>{
    displayCharacters(nameFilterEl.value,  statusFilterEl.value);
});