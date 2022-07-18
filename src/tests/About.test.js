import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 02', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const h2AboutPokedex = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2AboutPokedex).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const firstText = screen.getByText(/This application simulates/i);
    const secondText = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstText).toBeDefined();
    expect(secondText).toBeDefined();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage.src).toBe(imageUrl);
  });
});
