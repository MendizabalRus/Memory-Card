import "../style/score.css"

export default function Score({currentScoreboard, bestScoreboard}) {
    return (
        <div className="score">
            <div className="score-current-score">
                <p className="score-current-score-text">CURRENT SCORE</p>
                <p className={`score-current-score-number ${currentScoreboard === 12? "win" : ""}`}>{currentScoreboard}</p>
            </div>
            <div className="score-best-score">
                <p className="score-best-score-text">BEST SCORE</p>
                <p className="score-best-score-number">{bestScoreboard}</p>
            </div>
        </div>
    )
} 