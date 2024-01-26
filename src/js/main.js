async function pegarPokemonAPI(inicio, quantiaPokemon) {
  let msg = document.createElement("p");
  msg.innerHTML = "Carregando...";
  albumPokemon.append(msg);

  let arrayPokemon = [];
  for (let i = inicio; i <= quantiaPokemon; i++) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = response.data;
    data.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
    arrayPokemon.push(data);
  }

  albumPokemon.innerHTML = "";
  criarCard(arrayPokemon);
}

function criarCard(arrayPokemon) {
  for (let i = 0; i < arrayPokemon.length; i++) {
    let card = document.createElement("div");
    card.classList.add("cardPokemon");

    let idPokemon = document.createElement("small");
    idPokemon.innerHTML = arrayPokemon[i].id;
    let imagePokemon = document.createElement("img");
    imagePokemon.src = arrayPokemon[i].img;
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
  ini += quantPokemon;
  qPokemon += quantPokemon;
  albumPokemon.innerHTML = "";
  pegarPokemonAPI(ini, qPokemon);
}

let albumPokemon = document.getElementById("albumPokemon");

larguraTela = window.innerWidth;
let ini = 1;
let quantPokemon = 1;
if (larguraTela < 900) {
  quantPokemon = 20;
} else if (larguraTela < 1700) {
  quantPokemon = 50;
} else {
  quantPokemon = 100;
} 
let qPokemon = quantPokemon;
pegarPokemonAPI(ini, quantPokemon);
