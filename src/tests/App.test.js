import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 01', () => {
  it('Deve ter um link com o texto Home', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('Deve ter um link com o texto About', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Deve ter um link com o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
  });

  it('Redireciona para a página a página inicial, na URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });
      userEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Redireciona para a página de About, na URL /about, ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkAbout);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it('Vai para a página de favoritos, na URL /favorites, ao clicar no Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Deve redirecionar para a página a página inicial, na URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/ddhauduadhu');

      const notFound = screen.getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
