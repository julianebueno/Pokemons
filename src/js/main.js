
async function criarCard() {
    console.log("entrouPokemon")
    let quantiaPokemon = 10
    
    for (let i = 1; i <= quantiaPokemon; i++) {

        console.log("entrouFor")
        let card = document.createElement("div");
        card.classList.add('cardPokemon');

        let imagePokemon = document.createElement("img");
        imagePokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i}.png`

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = response.data;

        card.append(data.id);
        card.append(imagePokemon);
        card.append(data.name);
        
        albumPokemon.append(card)
        
    }
    
}

let albumPokemon = document.getElementById('albumPokemon')
criarCard()
