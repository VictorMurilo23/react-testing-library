import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const charmanderPathname = '/pokemons/4';

describe('Requisito 07', () => {
  it('Verifica se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);

      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemon).toBeDefined();
      userEvent.click(nextPokemon);

      const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetails);
      const { pathname } = history.location;
      expect(pathname).toBe(charmanderPathname);

      expect(screen.getByText(/Charmander Details/i)).toBeDefined();
      expect(screen.getByRole('heading', { name: /Summary/i, level: 2 })).toBeDefined();
      const pokemonInfo = /The flame on its tail shows the strength of its life force/i;
      expect(screen.getByText(pokemonInfo)).toBeDefined();
      expect(linkMoreDetails).not.toBeInTheDocument();
    });

  it('Verifica se existe na página uma seção com as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);

      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemon).toBeDefined();
      userEvent.click(nextPokemon);

      const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetails);
      const { pathname } = history.location;
      expect(pathname).toBe(charmanderPathname);

      const charmanderLocationHeading = screen
        .getByRole('heading', { name: /Game Locations of Charmander/i, level: 2 });
      expect(charmanderLocationHeading).toBeDefined();

      const charmanderLocations = screen.getAllByAltText(/Charmander location/i);
      const locationsCount = 4;
      expect(charmanderLocations).toHaveLength(locationsCount);
      expect(charmanderLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
      expect(charmanderLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png');
      expect(charmanderLocations[2].src).toBe('https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png');
      expect(charmanderLocations[3].src).toBe('https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png');
    });

  it('Verifica se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);

      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemon).toBeDefined();
      userEvent.click(nextPokemon);

      const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetails);
      const { pathname } = history.location;
      expect(pathname).toBe(charmanderPathname);

      const favoritePokemonCheckbox = screen.getByLabelText(/Pokémon favoritado/i);
      expect(favoritePokemonCheckbox).toBeDefined();
      userEvent.click(favoritePokemonCheckbox);

      userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
      expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
      expect(history.location.pathname).toBe('/favorites');

      userEvent.click(screen.getByText(/more details/i));
      expect(history.location.pathname).toBe(charmanderPathname);
      userEvent.click(screen.getByLabelText(/Pokémon favoritado/i));
      userEvent.click(screen.getByText(/favorite pokémons/i));
      expect(history.location.pathname).toBe('/favorites');
      expect(screen.getByText(/No favorite pokemon found/i)).toBeDefined();
    });
});
