import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 03', () => {
  it('Verifica se No favorite pokemon found é exibido, caso não tenha pokémons favoritos',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorites');

      const noFavoritePokemonText = screen.getByText(/No favorite pokemon found/i);
      expect(noFavoritePokemonText).toBeDefined();
    });

  it('Verifica se são exibidos todos os pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const firstFavoritedPokemon = /pikachu/i;
    const moreDetailsText = screen.getByText(/more details/i);
    expect(moreDetailsText).toBeDefined();

    userEvent.click(moreDetailsText);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(firstFavoritedPokemon);
    expect(pokemonName).toBeInTheDocument();
    const favoriteCheckBox = screen.getByLabelText(/Pokémon favoritado/i);
    expect(favoriteCheckBox).toBeDefined();
    userEvent.click(favoriteCheckBox);
    history.push('/favorites');

    const pikachuInFavorites = screen.getByText(/pikachu/i);
    expect(pikachuInFavorites).toBeInTheDocument();
  });
});
