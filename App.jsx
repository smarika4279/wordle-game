
import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/gameBoard";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import "./App.css";

function App() {
  const [solutionWord] = useState("CRANE");
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [keyColors, setKeyColors] = useState({});
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  function checkGuess(guess) {
    return guess.split("").map((letter, index) => {
      if (letter === solutionWord[index]) return "correct";
      if (solutionWord.includes(letter)) return "present";
      return "absent";
    });
  }

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "ENTER") {
      if (currentGuess.length !== 5) return;

      const result = checkGuess(currentGuess);
      const guesses = [...pastGuesses, currentGuess];

      setPastGuesses(guesses);
      setResults([...results, result]);
      setCurrentGuess("");

      const colors = { ...keyColors };
      result.forEach((status, index) => {
        const letter = currentGuess[index];
        const priority = { absent: 1, present: 2, correct: 3 };

        if (!colors[letter] || priority[status] > priority[colors[letter]]) {
          colors[letter] = status;
        }
      });

      setKeyColors(colors);

      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      } else if (guesses.length === 6) {
        setGameStatus("LOST");
      }

      return;
    }

    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [gameStatus, currentGuess, pastGuesses, results, keyColors]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        event.preventDefault();
        handleKeyPress("BACKSPACE");
      } else if (event.key === "Enter") {
        handleKeyPress("ENTER");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  function restartGame() {
    setCurrentGuess("");
    setPastGuesses([]);
    setResults([]);
    setKeyColors({});
    setGameStatus("IN_PROGRESS");
  }

  return (
    <div className="app">
      <h1>WORDLE GAME</h1>
      <p>Guess the hidden five-letter word!</p>

      <GameBoard
        guesses={pastGuesses}
        currentGuess={currentGuess}
        results={results}
      />

      <Keyboard onKeyPress={handleKeyPress} keyColors={keyColors} />

      <p>Game Status: {gameStatus}</p>

      <GameOver
        status={gameStatus}
        solution={solutionWord}
        onRestart={restartGame}
      />
    </div>
  );
}

export default App;
