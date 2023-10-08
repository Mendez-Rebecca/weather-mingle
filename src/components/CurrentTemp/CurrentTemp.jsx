export default function CurrentTemp({ currentTemp }) {
    return (
        <div className="CurrentTemp">
            <p>{(currentTemp * 9 / 5 + 32).toFixed(0)}°F</p>
        </div>
    );
};
