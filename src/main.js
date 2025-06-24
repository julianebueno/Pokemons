// #region ================================== MODEL
function ConstuirCardPokemon(pokemon) {
  let card = document.createElement("div");
  card.classList.add("cardPokemon");
  card.setAttribute("id", pokemon.id);
  card.setAttribute("onclick", "switchModal('" + card.id + "')");

  let imagePokemon = document.createElement("img");
  imagePokemon.src = pokemon.sprites.front_default;
  imagePokemon.classList.add("imagePokemon");
  card.append(imagePokemon);

  let idPokemon = document.createElement("p");
  idPokemon.innerHTML = pokemon.id;
  card.append(idPokemon);

  let namePokemon = document.createElement("p");
  namePokemon.innerHTML = pokemon.name;
  card.append(namePokemon);

  let typesPokemon = document.createElement("p");
  typesPokemon.classList.add("typesPokemon");
  if (pokemon.types.length > 1) {
    for (let j = 0; j < pokemon.types.length; j++) {
      let typePokemon = document.createElement("small");
      typePokemon.style.backgroundColor = typeColor[pokemon.types[j].type.name];
      typePokemon.innerHTML = pokemon.types[j].type.name;
      typesPokemon.append(typePokemon);
    }
  } else {
    let typePokemon = document.createElement("small");
    typePokemon.style.backgroundColor = typeColor[pokemon.types[0].type.name];
    typePokemon.innerHTML = pokemon.types[0].type.name;
    typesPokemon.append(typePokemon);
  }
  card.append(typesPokemon);
  return card;
}

// #endregion =============================== MODEL


// #region ================================== VIEW
function MostrarCarregando() {
  let msg = document.createElement("p");
  msg.innerHTML = "Carregando...";
  return msg;
}
// #endregion =============================== VIEW


// #region ================================== CONTROLLER
async function pegarPokemonAPI(inicio, quantiaPokemon) {
  albumPokemon.append(MostrarCarregando());

  for (let i = inicio; i <= quantiaPokemon; i++) {
    if (i < 1 || i > 1025) {
      break;
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = response.data;
    arrayPokemon.push(data);
  }
  
  albumPokemon.innerHTML = "";
  criarCard(arrayPokemon);
}

function criarCard(arrayPokemon) {
  for (let i = 0; i < arrayPokemon.length; i++) {
    let card = ConstuirCardPokemon(arrayPokemon[i]);
    card.style.backgroundColor = typeColor[arrayPokemon[i].types[0].type.name];
    albumPokemon.append(card);
  }
}

function carregarMaisPokemons() {
  if (qPokemon < 1025) {
    ini += quantPokemon;
    qPokemon += quantPokemon;
    pegarPokemonAPI(ini, qPokemon);
  }
}
// #endregion =============================== CONTROLLER

// #region ================================== MODAL

const switchModal = (ind) => {
  const modal = document.querySelector('.modal')
  const actualStyle = modal.style.display
  if(actualStyle == 'block') {
    modal.style.display = 'none'
  }
  else {
    modal.append(construirModal(ind));
    modal.style.display = 'block'
  }
}

function construirModal(indet) {
  const infoModal = document.querySelector('.content')
  infoModal.innerHTML = '';
  indet = indet - ini;

  // let div1 = document.createElement("div");

  let idPok = document.createElement("small");
  idPok.innerHTML = arrayPokemon[indet].id;
  infoModal.append(idPok);

  let imgPok = document.createElement("img");
  imgPok.src = arrayPokemon[indet].sprites.front_default;
  infoModal.append(imgPok);
  
  let namePok = document.createElement("p");
  namePok.innerHTML = arrayPokemon[indet].name.charAt(0).toUpperCase() + arrayPokemon[indet].name.slice(1);
  infoModal.append(namePok);
  
  for (let i = 0; i < arrayPokemon[indet].types.length; i++) {
    let typePok = document.createElement("small");
    typePok.innerHTML = arrayPokemon[indet].types[i].type.name.charAt(0).toUpperCase() + arrayPokemon[indet].types[i].type.name.slice(1);
    infoModal.append(typePok);
  }
  
  return infoModal;
}
// #endregion =============================== MODAL


// #region ================================== GLOBAL VARIABLES

let arrayPokemon = [];
let albumPokemon = document.getElementById("albumPokemon");

let ini = 1;
let quantPokemon = 10;
let qPokemon = quantPokemon;

let typeColor = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

// #endregion =============================== GLOBAL VARIABLES

pegarPokemonAPI(ini, quantPokemon);

// #region ================================== EVENT LISTENERS
document.getElementById("botaoVerMais").addEventListener("click", carregarMaisPokemons);
document.querySelector(".closeModal").addEventListener("click", switchModal);
window.onclick = function(event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    switchModal();
  }
};
// #endregion =============================== EVENT LISTENERS
