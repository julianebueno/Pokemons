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
async function pegarPokemonAPI(quantiaPokemon) {
  albumPokemon.append(MostrarCarregando());
  let limite = arrayPokemon.length + quantiaPokemon;
  for (let i = arrayPokemon.length + 1; i <= limite; i++) {
    if (i < 1 || i > 1025) {
      break;
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = response.data;
    arrayPokemon.push(data);
  }
  criarCard(arrayPokemon);
}

function criarCard(arrayPokemon) {
  albumPokemon.innerHTML = "";
  for (let i = 0; i < arrayPokemon.length; i++) {
    let card = ConstuirCardPokemon(arrayPokemon[i]);
    card.style.backgroundColor = typeColor[arrayPokemon[i].types[0].type.name];
    albumPokemon.append(card);
  }
}

function carregarMaisPokemons() {
  if (arrayPokemon.length <= 1025) {
    pegarPokemonAPI(passoQuantiaPokemon);
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
    construirModal(ind - 1);
    modal.style.display = 'block'
  }
}

function construirModal(indet) {
  let pokemonModal = arrayPokemon[indet];
  
  let pokemonName = document.getElementById("pokemonName");
  pokemonName.innerHTML = pokemonModal.name;

  let pokemonImage = document.getElementById("pokemonImage");
  pokemonImage.src = pokemonModal.sprites.front_default;
  pokemonImage.alt = pokemonModal.name;

  let pokemonId = document.getElementById("pokemonId");
  pokemonId.innerHTML = "#" + pokemonModal.id.toString().padStart(4, '0');

  let pokemonHeight = document.getElementById("pokemonHeight");
  pokemonHeight.innerHTML = (pokemonModal.height / 10) + " m";

  let pokemonWeight = document.getElementById("pokemonWeight");
  pokemonWeight.innerHTML = (pokemonModal.weight / 10) + " kg";

  let pokemonType = document.getElementById("pokemonType");
  pokemonType.innerHTML = "";
  if (pokemonModal.types.length > 1) {
    for (let j = 0; j < pokemonModal.types.length; j++) {
      let typePokemon = document.createElement("small");
      typePokemon.style.backgroundColor = typeColor[pokemonModal.types[j].type.name];
      typePokemon.innerHTML = pokemonModal.types[j].type.name;
      pokemonType.append(typePokemon);
    }
  } else {
    let typePokemon = document.createElement("small");
    typePokemon.style.backgroundColor = typeColor[pokemonModal.types[0].type.name];
    typePokemon.innerHTML = pokemonModal.types[0].type.name;
    pokemonType.append(typePokemon);
  }

  let pokemonAbilities = document.getElementById("pokemonAbilities");
  pokemonAbilities.innerHTML = "";
  if (pokemonModal.abilities.length > 1) {
    for (let j = 0; j < pokemonModal.abilities.length; j++) {
      let abilityPokemon = document.createElement("small");
      abilityPokemon.innerHTML = pokemonModal.abilities[j].ability.name;
      pokemonAbilities.append(abilityPokemon);
    }
  } else {
    let abilityPokemon = document.createElement("small");
    abilityPokemon.innerHTML = pokemonModal.abilities[0].ability.name;
    pokemonAbilities.append(abilityPokemon);
  }

  let pokemonDescription = document.getElementById("pokemonDescription");
  // pokemonDescription.innerHTML = pokemonModal.flavor_text_entries[0].flavor_text;
  pokemonDescription.innerHTML = "Descrição não disponível.";

}
// #endregion =============================== MODAL


// #region ================================== GLOBAL VARIABLES

let arrayPokemon = [];
let albumPokemon = document.getElementById("albumPokemon");
let passoQuantiaPokemon = 10;
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

pegarPokemonAPI(passoQuantiaPokemon);

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
