import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 04', () => {
  it('Verfica se a página contém um h2 com o texto "Page requested not found 😭"',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/nao-existe');

      const h2NotFound = screen.getByText(/page requested not found/i);
      expect(h2NotFound).toBeDefined();
    });

  it('Verifica se a página NotFound mostra a imagem do Pikachu chorando',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/nao-existe');

      const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const imageNotFound = screen
        .getByAltText(/Pikachu crying because the page requested was not found/i);
      expect(imageNotFound.src).toBe(url);
    });
});
