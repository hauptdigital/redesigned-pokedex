import { createElement, appendElement, removeAllChilds } from './lib/util';
import Logo from './assets/img/logo.png';
import './app.scss';
import './components/search.scss';

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
      removeAllChilds(searchResultsWrapper);

      filteredPokemons.forEach(pokemon => {
        const searchResult = createElement('div', {
          className: 'searchResultsWrapper__searchResult'
        });
        searchResult.dataset.pokemonid = pokemon.id;
        const searchResultTitle = createElement('h2', {
          className: 'searchResultsWrapper__title',
          innerText: pokemon.name
        });
        const searchResultImageWrapper = createElement('div', {
          className: 'searchResultsWrapper__imageWrapper'
        });
        const searchResultImage = createElement('img', {
          className: 'searchResultsWrapper__image',
          src: pokemon.imagePath
        });
        appendElement(searchResultImageWrapper, [searchResultImage]);
        appendElement(searchResult, [
          searchResultTitle,
          searchResultImageWrapper
        ]);
        appendElement(searchResultsWrapper, [searchResult]);
      });
    });

    function filterResults(searchQuery, pokemonData) {
      // Get Pokemon names

      const filteredPokemons = pokemonData.filter(pokemon => {
        const pokemonName = pokemon.name;
        return pokemonName.toLowerCase().startsWith(searchQuery.toLowerCase());
      });

      return filteredPokemons;
    }
  }

  createSearchResults();

  // Main
  const main = createElement('main', { className: 'main' });
  // Build app

  appendElement(header, [logo, title]);
  appendElement(searchWrapper, [search]);
  appendElement(main, [searchWrapper, searchResultsWrapper]);

  return [header, main];
}
