import { useState, useEffect } from "react";

import Score from "./components/score.jsx"
import Card from "./components/card.jsx"

import './App.css'

const pokemonsArr = ["charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "bulbasaur", "ivysaur", "venusaur", "zapdos", "articuno", "moltres"];

const shuffleArray = (array) => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons()
  }, []);
  
  const getPokemons = async () => {
    try {
      const responses = await Promise.all(
        pokemonsArr.map((pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`))
      );
      
      const data = await Promise.all(responses.map((res) => res.json()));
     
      const formatted = data.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      }));

      setPokemons(shuffleArray(formatted));
    }
      
    catch (error) {
      console.error(error);
    }
  };

  const onClick = (id) => {
    setPokemons((prev) => shuffleArray(prev))
  }

  return (
    <>
      <Score />
      <div className="cards-container">
        {pokemons.map(pokemon => (
          <Card 
            key={pokemon.id} 
            pokemon={pokemon} 
            onClick={() => onClick(pokemon.id)}
          />
        ))}
      </div>
    </>
  )
}