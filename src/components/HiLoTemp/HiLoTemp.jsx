export default function HiLoTemp({ temps }) {
    return (
        <div>
            <p>Hi: {(temps[21] * 9 / 5 + 32).toFixed(0)}°F</p>
            <p>Lo: {(temps[22] * 9 / 5 + 32).toFixed(0)}°F</p>
        </div>
    )
}
