import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonNameDataTest = 'pokemon-name';

describe('Requisito 05', () => {
  it('Verifica se a página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2EncounteredPokemons = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(h2EncounteredPokemons).toBeDefined();
  });

  it('Verifica se o próximo pokémon é exibido quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);

      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPokemonButton).toBeDefined();
      const pokemonsName = pokemons.map((element) => element.name).slice(1);
      pokemonsName.forEach((pokemonName) => {
        userEvent.click(nextPokemonButton);
        const currentPokemon = screen.getByTestId(pokemonNameDataTest);
        expect(currentPokemon).toHaveTextContent(pokemonName);
      });

      userEvent.click(nextPokemonButton);
      const firstPokemon = screen.getByTestId(pokemonNameDataTest);
      expect(firstPokemon).toHaveTextContent(/pikachu/i);
    });

  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(pokemonNameDataTest);
    expect(pokemonName).toHaveLength(1);
  });

  it('Verifica se os botões de filtro por tipo funcionam', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemonTypes = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];

    const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allTypeButtons).toHaveLength(pokemonTypes.length);

    pokemonTypes.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const filteredPokemons = pokemons
        .filter((element) => element.type === type)
        .map((element) => element.name);
      if (filteredPokemons.length > 1) {
        filteredPokemons.forEach((pokemon) => {
          const currentPokemon = screen.getByTestId(pokemonNameDataTest);
          expect(currentPokemon).toHaveTextContent(pokemon);
          userEvent.click(nextPokemonButton);
        });
        expect(screen.getByTestId(pokemonNameDataTest))
          .toHaveTextContent(filteredPokemons[0]);
      }
    });
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro e se ele funciona',
    () => {
      renderWithRouter(<App />);

      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeDefined();

      const verifyPokemons = () => {
        const nextPokemonButton = screen
          .getByRole('button', { name: /Próximo pokémon/i });
        const pokemonsName = pokemons.map((element) => element.name);
        pokemonsName.forEach((pokemonName) => {
          const currentPokemon = screen.getByTestId(pokemonNameDataTest);
          expect(currentPokemon).toHaveTextContent(pokemonName);
          userEvent.click(nextPokemonButton);
        });
      };

      verifyPokemons(); // verifica se tá com o filtro certo assim que carrega

      userEvent.click(screen.getByRole('button', { name: /fire/i }));

      userEvent.click(buttonAll);
      verifyPokemons(); // verifica se tá com o filtro certo assim que você volta pro all
    });
});
