import { createElement, appendElement, removeAllChilds } from './lib/util';
import Logo from './assets/img/logo.png';
import './app.scss';
import './components/search.scss';
import './components/detailview.scss';

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

    const pokemonID = '125';
    async function openDetailView(pokemonID) {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID + '/';
      const response = await fetch(url);
      const pokemon = await response.json();

      // Build detail view
      const detailViewImageWrapper = createElement('div', {
        className: 'detailViewImageWrapper'
      });
      const detailViewImage = createElement('img', {
        className: 'detailViewImage',
        src:
          'https://pokeres.bastionbot.org/images/pokemon/' + pokemon.id + '.png'
      });
      appendElement(detailViewImageWrapper, [detailViewImage]);
      const detailViewContainer = createElement('div', {
        className: 'detailViewContainer'
      });
      const detailView = createElement('div', {
        className: 'detailView'
      });
      const detailViewTitleBar = createElement('div', {
        className: 'detailView__titleBar'
      });
      const detailViewNumber = createElement('div', {
        className: 'detailView__number',
        innerText: 'No. ' + pokemon.id
      });
      const detailViewTitle = createElement('div', {
        className: 'detailView__title',
        innerText: pokemon.name
      });
      appendElement(detailViewTitleBar, [detailViewNumber, detailViewTitle]);

      const detailViewTypes = createElement('div', {
        className: 'detailView__types'
      });

      const detailViewTypesTitle = createElement('div', {
        className: 'detailView__typesTitle',
        innerText: 'Types: '
      });
      appendElement(detailViewTypes, [detailViewTypesTitle]);

      pokemon.types.forEach(type => {
        const detailViewType = createElement('div', {
          className: 'detailView__type',
          innerText: type.type.name
        });
        appendElement(detailViewTypes, [detailViewType]);
      });

      const detailViewStats = createElement('div', {
        className: 'detailView__stats'
      });

      const detailViewStatsTitle = createElement('div', {
        className: 'detailView__statsTitle',
        innerText: 'Stats'
      });

      appendElement(detailViewStats, [detailViewStatsTitle]);

      pokemon.stats.forEach(stat => {
        const detailViewStatRow = createElement('div', {
          className: 'detailView__row'
        });

        const detailViewStatName = createElement('div', {
          className: 'detailView__stat',
          innerText: stat.stat.name
        });

        const detailViewStatBar = createElement('div', {
          className: 'detailView__statBar'
        });

        const detailViewStatBarFilled = createElement('div', {
          className: 'detailView__statBarFilled',
          innerText: stat.base_stat
        });
        detailViewStatBarFilled.style.width = stat.base_stat * 2 + 'px';
        appendElement(detailViewStatBar, [detailViewStatBarFilled]);
        appendElement(detailViewStatRow, [
          detailViewStatName,
          detailViewStatBar
        ]);
        appendElement(detailViewStats, [detailViewStatRow]);
      });

      const detailViewMoves = createElement('div', {
        className: 'detailView__moves'
      });

      const detailViewMovesTitle = createElement('div', {
        className: 'detailView__movesTitle',
        innerText: 'Moves'
      });

      appendElement(detailViewMoves, [detailViewMovesTitle]);

      const detailViewMovesWrapper = createElement('div', {
        className: 'detailViewMovesWrapper'
      });

      pokemon.moves.forEach(move => {
        const detailViewMove = createElement('div', {
          className: 'detailView__move',
          innerText: move.move.name
        });
        appendElement(detailViewMovesWrapper, [detailViewMove]);
      });
      appendElement(detailViewMoves, [detailViewMovesWrapper]);

      appendElement(detailView, [
        detailViewTitleBar,
        detailViewTypes,
        detailViewStats,
        detailViewMoves
      ]);
      appendElement(detailViewContainer, [detailView, detailViewImageWrapper]);
      document.body.insertBefore(detailViewContainer, header);
    }

    openDetailView(pokemonID);

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
