function Tile({ letter, status }) {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "2px solid gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold"
      }}
    >
      {letter}
    </div>
  );
}

export default Tile;