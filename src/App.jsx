import Score from "./components/score.jsx"
import Card from "./components/card.jsx"

import './App.css'

export default function App() {


  return (
    <>
      <Score />
      <div className="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}