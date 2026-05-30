import "../style/score.css"

export default function Score() {
    return (
        <div className="score">
            <div className="score-current-score">
                <p>CURRENT SCORE</p>
                <p>0</p>
            </div>
            <div className="score-best-score">
                <p>BEST SCORE</p>
                <p>0</p>
            </div>
        </div>
    )
} 