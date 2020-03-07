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

  async function createSearchResults() {
    search.addEventListener('input', async event => {
      const input = event.target;
      const searchQuery = input.value;

      // Get Data
      const pokemonData = await fetchPokemons();

      // Filter results
      const filteredPokemons = filterResults(searchQuery, pokemonData);

      // Create search results

      filteredPokemons.forEach(pokemon => {
        const searchResult = createElement('div', {
          className: 'searchResultsWrapper__searchResult'
        });
        const searchResultTitle = createElement('h2', {
          className: 'searchResultsWrapper__title',
          innerText: pokemon
        });
      });
    });

    function filterResults(searchQuery, pokemonData) {
      // Get Pokemon names
      console.log(pokemonData);

      const filteredPokemons = [];
      pokemonData.forEach(pokemon => {
        const pokemonName = pokemon.name;
        if (pokemonName.toLowerCase().startsWith(searchQuery.toLowerCase())) {
          filteredPokemons.push(pokemon);
        }
      });
      if (filteredPokemons.length === 0) {
        filteredPokemons.push('No Pokémon match your search query');
      }
      console.log(filteredPokemons);

      //const pokemonNames = pokemonData.map(pokemon => {
      //  console.log(Object.entries(pokemon));
      //  const pokemonName = pokemon.name;
      //  const pokemonNameCapitalized =
      //    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
      //  return pokemonNameCapitalized;
      //});

      const filteredSearchResults = data
        .filter(entry => {
          return entry.toLowerCase().startsWith(searchQuery.toLowerCase());
        })
        .sort();
      return filteredSearchResults;
    }
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
