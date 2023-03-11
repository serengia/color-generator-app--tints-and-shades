import React, { useState } from "react";

import Values from "values.js";
import SingleColor from "./components/SingleColor";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#1A73E8").all(10));
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const tintsList = list.slice(0, 11).reverse();
  const shadesList = list.slice(10);

  console.log(tintsList, shadesList);

  return (
    <main className="main-page">
      <section>
        <div className="form-container row">
          <h1 className="header-primary">Color generator</h1>
          <div className="actions">
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#1A73E8"
                className={`${error ? "error" : null}`}
              />
              <button type="submit" className="btn btn-submit">
                submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="color-header row">
          <h2 className="header-secondary">Tints </h2>
        </div>
        <div className="tint-container row">
          {tintsList.map((color) => {
            return <SingleColor key={color.weight} {...color} />;
          })}
        </div>
        <div className="color-header row">
          <h2 className="header-secondary">Shades </h2>
        </div>
        <div className="shades-container row">
          {shadesList.map((color) => {
            return (
              <SingleColor key={color.weight} {...color} lightColor={true} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
