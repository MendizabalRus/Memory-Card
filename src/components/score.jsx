import "../style/score.css"

export default function Score({scoreboard}) {
    return (
        <div className="score">
            <div className="score-current-score">
                <p className="score-current-score-text">CURRENT SCORE</p>
                <p className={`score-current-score-number ${scoreboard === 12? "win" : ""}`}>{scoreboard}</p>
            </div>
            <div className="score-best-score">
                <p className="score-best-score-text">BEST SCORE</p>
                <p className="score-best-score-number">0</p>
            </div>
        </div>
    )
} 