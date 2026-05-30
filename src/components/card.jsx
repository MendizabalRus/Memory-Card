import "../style/card.css"

export default function Card({pokemon}) {
    return (
        <div className="card">
            <img src={pokemon.image} alt={pokemon.name} />
        </div>
    )
} 