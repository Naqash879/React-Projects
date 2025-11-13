import "./colorchange.css";
function ColorChange() {
  const color = ["red", "green", "yellow", "blue"];
  return (
    <>
      <div className="color-container">
        <h1>Color App</h1>
        <div className="color-div">
          {color.map((c) => (
            <button
              key={c}
              value={c}
              onClick={() => (document.body.style.backgroundColor = c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
export default ColorChange;
