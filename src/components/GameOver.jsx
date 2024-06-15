export default function GameOver({ player, startOver }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{player ? `${player} won` : "It's a draw"}</p>
      <p>
        <button onClick={startOver}>Rematch</button>
      </p>
    </div>
  );
}
