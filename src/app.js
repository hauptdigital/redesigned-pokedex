export function app() {
  const element = document.createElement('div');

  async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
    const results = await response.json();
    const pokemons = await results.results;
    const pokemonData = [];

    pokemons.forEach(async pokemon => {
      const response = await fetchPokemon(pokemon);
      pokemonData.push(response);
      const pokemonDiv = document.createElement('div');
      pokemonDiv.innerText = pokemonData.name;
    });

    return pokemonData;
  }

  async function fetchPokemon(pokemon) {
    let url = pokemon.url;
    const response = await fetch(url);
    const results = await response.json();

    const pokemonData = results;

    return pokemonData;
  }

  return [element];
}
