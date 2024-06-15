import { useState } from "react";
import Header from "./components/Header.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";

const INITIAL_DATA = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = { X: "Player 1", O: "Player 2" };

function extractActivePlayer(player) {
  let activePlayer = "X";
  if (player.length > 0 && player[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function extractGameBoard(board, gameTurn) {
  const gameBoard = [...board.map((data) => [...data])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function extractWinner(condition, gameBoard, playerName) {
  let winner = undefined;
  for (const combination of condition) {
    const firstGameSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondGameSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdGameSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstGameSymbol &&
      firstGameSymbol === secondGameSymbol &&
      firstGameSymbol === thirdGameSymbol
    ) {
      winner = playerName[firstGameSymbol];
    }
  }
  return winner;
}

export default function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  const gameBoard = extractGameBoard(INITIAL_DATA, gameTurn);

  const winner = extractWinner(WINNING_COMBINATIONS, gameBoard, playerName);

  const hasDraw = gameTurn.length === 9 && winner === undefined;

  const currentPlayer = extractActivePlayer(gameTurn);
  const currentPlayerHandler = (rowIndex, colIndex) => {
    setGameTurn((prevGameTurn) => {
      const prevPlayer = extractActivePlayer(prevGameTurn);
      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: prevPlayer },
        ...prevGameTurn,
      ];
      return updatedGameTurn;
    });
  };

  const handleStartOver = () => {
    setGameTurn([]);
  };

  const handlePlayerName = (symbol, newName) => {
    setPlayerName((prevPlayerName) => {
      return { ...prevPlayerName, [symbol]: newName };
    });
  };

  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={PLAYERS.X}
              symbol="X"
              isActive={currentPlayer === "X"}
              onEditPlayer={handlePlayerName}
            />
            <Player
              name={PLAYERS.O}
              symbol="O"
              isActive={currentPlayer === "O"}
              onEditPlayer={handlePlayerName}
            />
          </ol>
          {(winner || hasDraw) && <GameOver player={winner} startOver={handleStartOver} />}
          <GameBoard onSelectPlayer={currentPlayerHandler} board={gameBoard} />
        </div>
        <Log turns={gameTurn} />
      </main>
    </>
  );
}
