import { createElement, appendElement } from './lib/util';
import Logo from './assets/img/logo.png';

export function app() {
  async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
    const results = await response.json();
    const pokemons = await results.results;

    const pokemonData = [];

    pokemons.forEach(pokemon => {
      // Sorry for the dirty implementation of pictures.

      const subStrings = pokemon.url.split('/');
      const pokemonId = subStrings[6];
      const imagePath =
        'https://pokeres.bastionbot.org/images/pokemon/' + pokemonId + '.png';
      pokemonData.push({
        name: pokemon.name,
        id: pokemonId,
        imagePath: imagePath
      });
    });

    return pokemonData;
  }

  //   async function fetchPokemon(pokemon) {
  //     let url = pokemon.url;
  //     const response = await fetch(url);
  //     const results = await response.json();
  //     const pokemonData = await results;
  //     return pokemonData;
  //   }

  // Header
  const header = createElement('header', {
    className: 'header'
  });
  const logo = createElement('img', {
    className: 'header__logo',
    src: Logo
  });
  const title = createElement('h1', {
    className: 'header__title',
    innerText: 'Pokédex'
  });

  // Search

  const searchWrapper = createElement('div', {
    className: 'searchWrapper'
  });
  const search = createElement('input', {
    className: 'searchWrapper__input',
    type: 'text'
  });

  // Search Results

  const searchResultsWrapper = createElement('div', {
    className: 'searchResultsWrapper'
  });

  async function createSearchResults(searchQuery, data) {
    search.addEventListener('input', async event => {
      const input = event.target;
      const searchQuery = input.value;
      console.log(searchQuery);

      // Get Data
      const pokemonData = await fetchPokemons();

      console.log(pokemonData[0].name);
    });

    const filteredSearchResults = data
      .filter(entry =>
        entry.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .sort();
    return filteredSearchResults;
  }

  createSearchResults('', []);

  // Main
  const main = createElement('main', { className: 'main' });
  // Build app

  appendElement(header, [logo, title]);
  appendElement(searchWrapper, [search]);
  appendElement(main, [searchWrapper, searchResultsWrapper]);

  return [header, main];
}
