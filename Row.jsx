import Tile from "./Tile";

function Row({ guess, result }) {
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ""}
          status={result ? result[index] : ""}
        />
      ))}
    </div>
  );
}

export default Row;