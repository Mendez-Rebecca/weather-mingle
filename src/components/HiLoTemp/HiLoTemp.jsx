export default function HiLoTemp({ temps }) {
    return (
        <div className="TempContainer">
            <div className="HiTemp">
                <h2>Hi</h2>
                <p>{(temps[21] * 9 / 5 + 32).toFixed(0)}°F</p>
            </div>
            <div className="LoTemp">
                <h2>Lo</h2>
                <p>{(temps[22] * 9 / 5 + 32).toFixed(0)}°F</p>
            </div>
        </div>
    )
}
