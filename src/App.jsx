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

  // CURRENT SCOREBOARD STATE
  const [currentScoreboard, setCurrentScoreboard] = useState(0);

  // BEST SCOREBOARD STATE
  const [bestScoreboard, setBestScoreboard] = useState(0);

  // GAME FINISHED STATE
  const [gameFinished, setGameFinished] = useState(false);

  // EFFECT FOR SYNCING API REQUEST WITH RENDERING
  useEffect(() => {
    getPokemons()
  }, []);

  // EFFECT FOR SYNCING CURRENTSCOREBOARD WITH REAL VALUE (AVOID OFF-BY-ONE)
  useEffect(() => {
      // GAME FINISHED? CALL GAMEWON AND FINISH THE GAME
      currentScoreboard === pokemons.length ? gameWon() : null;
    }, [currentScoreboard])

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
    // IN CASE LAST GAME WAS WON, SET THE GAMEFINISHED STATE TO FALSE NOW SO THE CONGRATS TEXT DISSAPERS ON NEXT CLICK
    setGameFinished(false);
    
    // CARD HAS BEEN CLICKED?
    clickedCards.includes(id) ? restartGame() : nextRound(id);
    
    // SHUFFLE CARDS
    setPokemons((prev) => shuffleArray(prev));
  };

  // GAME WON
  const gameWon = () => {
    // SET GAME FINISHED STATE TO TRUE
    setGameFinished(prev => !prev);
  };

  // NEXT ROUND
  const nextRound = (id) => {
    // +1 TO currentScoreboard
    setCurrentScoreboard(prev => prev + 1);

    // ADD CLICKED CARD TO CLICKED CARDS ARRAY
    setClickedCards(prev => [...prev, id]);
  };

  // GAME RESTART
  const restartGame = () => {
    // COMPARE AND SET BEST SCORE
    currentScoreboard > bestScoreboard ? setBestScoreboard(currentScoreboard) : null;

    // RESTART currentScoreboard
    setCurrentScoreboard(0);
    
    // EMPTY CLICKED CARDS STATE
    setClickedCards([]);
  };

  return (
    <>
      <Score 
        currentScoreboard={currentScoreboard}
        bestScoreboard={bestScoreboard}
      />
      {gameFinished && (<div className="win-message">That's a <i> nice brain </i> you got there kid.</div>)}
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