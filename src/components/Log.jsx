export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        return (
          <li key={`${turn.square.row},${turn.square.col}`}>
            <p>
              Player {turn.player} placed on position {turn.square.row + 1},
              {turn.square.col + 1}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
