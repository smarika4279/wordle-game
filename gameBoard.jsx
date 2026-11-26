import Row from "./Row";

function GameBoard({ guesses, currentGuess, results }) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }).map((_, index) => {
        let guess = "";

        if (index < guesses.length) {
          guess = guesses[index];
        } else if (index === guesses.length) {
          guess = currentGuess;
        }

        return (
          <Row
            key={index}
            guess={guess}
            result={results[index]}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;