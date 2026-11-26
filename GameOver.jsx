
function GameOver({ status, solution, onRestart }) {
  if (status === "IN_PROGRESS") {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {status === "WON"
            ? "Congratulations!"
            : "Game Over!"}
        </h2>

        <p>
          {status === "WON"
            ? "You guessed the correct word!"
            : "You have used all six attempts."}
        </p>

        <p>
          The correct word was: <strong>{solution}</strong>
        </p>

        <button onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOver;
