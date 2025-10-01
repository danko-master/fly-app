const ColorBlock = ({ color, text }) => {
  return (
    <div
      style={{
        width: "120px",
        height: "40px",
        backgroundColor: color,
        margin: "5px",
        padding: "3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1.2em",
      }}
      className="div-from-left rounded"
    >
      {text}
    </div>
  );
};

export default ColorBlock;
