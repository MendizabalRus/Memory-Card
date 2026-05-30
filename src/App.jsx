import { useState, useEffect } from "react";

import Score from "./components/score.jsx"
import Card from "./components/card.jsx"

import './App.css'

// POKEMON CARDS
const pokemonsArr = ["charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "bulbasaur", "ivysaur", "venusaur", "zapdos", "articuno", "moltres"];

// SHUFFLE
const shuffleArray = (array) => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export default function App() {
  // FETCHED POKEMONS STATE ARRAY
  const [pokemons, setPokemons] = useState([]);

  // CLICKED CARDS STATE ARRAY
  const [clickedCards, setClickedCards] = useState([]);

  // SCOREBOARD STATE
  const [scoreboard, setScoreboard] = useState(0);

  // EFFECT FOR SYNCING API REQUEST WITH RENDERING
  useEffect(() => {
    getPokemons()
  }, []);

  // FETCH DATA FROM THE API
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

  // GAME HANDLER FUNCTION
  const onClick = (id) => {
    // CARD HAS BEEN CLICKED?
    clickedCards.includes(id) ? restartGame() : nextRound(id);
    
    // SHUFFLE CARDS
    setPokemons((prev) => shuffleArray(prev));
  };

  // NEXT ROUND
  const nextRound = (id) => {
    // +1 TO SCOREBOARD
    setScoreboard(prev => prev + 1);

    // ADD CLICKED CARD TO CLICKED CARDS ARRAY
    setClickedCards(prev => [...prev, id]);
    
    console.log(scoreboard)
  };

  // GAME RESTART
  const restartGame = () => {
    // RESTART SCOREBOARD
    setScoreboard(0);
    
    // EMPTY CLICKED CARDS STATE
    setClickedCards([]);
    
    console.log(scoreboard)
  };

  return (
    <>
      <Score 
        scoreboard={scoreboard}
      />
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