async function pegarPokemonAPI(inicio, quantiaPokemon) {
  let msg = document.createElement("p");
  msg.innerHTML = "Carregando...";
  albumPokemon.append(msg);

  arrayPokemon = [];
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
    let card = document.createElement("div");
    card.classList.add("cardPokemon");
    card.setAttribute("id", arrayPokemon[i].id);
    card.setAttribute("onclick", "switchModal('" + card.id + "')");

    let idPokemon = document.createElement("small");
    idPokemon.innerHTML = arrayPokemon[i].id;
    let imagePokemon = document.createElement("img");
    imagePokemon.src = arrayPokemon[i].sprites.front_default;
    let namePokemon = document.createElement("p");
    namePokemon.innerHTML =
      arrayPokemon[i].name.charAt(0).toUpperCase() +
      arrayPokemon[i].name.slice(1);

    card.append(idPokemon);
    card.append(imagePokemon);
    card.append(namePokemon);
    albumPokemon.append(card);
  }
}

function voltarPagina() {
  if (ini > 1) {
    ini -= quantPokemon;
    qPokemon -= quantPokemon;
    albumPokemon.innerHTML = "";
    pegarPokemonAPI(ini, qPokemon);
  }
}

function avancarPagina() {
  if (qPokemon < 1025) {
    ini += quantPokemon;
    qPokemon += quantPokemon;
    albumPokemon.innerHTML = "";
    pegarPokemonAPI(ini, qPokemon);
  }
}

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

// ========================

let arrayPokemon = [];
let albumPokemon = document.getElementById("albumPokemon");

larguraTela = window.innerWidth;
let ini = 1;
let quantPokemon = 1;
if (larguraTela < 900) {
  quantPokemon = 10;
} else if (larguraTela < 1700) {
  quantPokemon = 20;
} else {
  quantPokemon = 30;
} 
let qPokemon = quantPokemon;
pegarPokemonAPI(ini, quantPokemon);

window.onclick = function(event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    switchModal();
  }
};
