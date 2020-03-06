import { createElement, appendElement, removeAllChilds } from './lib/util';
import Logo from './assets/img/logo.png';

export function app() {
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
    console.log(pokemonData);
    return pokemonData;
  }

  async function fetchPokemon(pokemon) {
    let url = pokemon.url;
    const response = await fetch(url);
    const results = await response.json();
    const pokemonData = results;
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

  // Main
  const main = createElement('main', { className: 'main' });
  // Build app

  appendElement(header, [logo, title]);
  //   appendElement(main, [
  //     searchElement,
  //     searchResultsWrapper,
  //     favoritesSection
  //   ]);

  fetchPokemons();

  return [header, main];
}
