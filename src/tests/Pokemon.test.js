import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 06', () => {
  it('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(/pikachu/i);

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(/electric/i);

      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

      const pokemonImageUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      const pokemonImage = screen.getByAltText('Pikachu sprite');
      expect(pokemonImage.alt).toBe('Pikachu sprite');
      expect(pokemonImage.src).toBe(pokemonImageUrl);
    });

  it('Verifica se o card do pokémon contém um link para exibir detalhes deste pokémon',
    () => {
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25'); // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library <-- me ajudou a escrever esse teste.
    });

  it('Verifica se ao clicar em "More details", você vai para a página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');

      expect(screen.getByText(/Pikachu Details/i)).toBeDefined();
      expect(screen.getByText(/This intelligent Pokémon/i)).toBeDefined();
    });

  it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheckBox = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteCheckBox);

    history.push('/');
    const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
