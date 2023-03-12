import React, { useEffect, useState } from "react";

import Values from "values.js";
import SingleColor from "./components/SingleColor";
import { toast, ToastContainer } from "react-toastify";

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
      toast.success(`Tints and Shades generated! -(${color})`);
    } catch (err) {
      setError(true);
      toast.error(`Invalid input '${color}' : Check input and try again.`);
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const tintsList = list.slice(0, 11).reverse();
  const shadesList = list.slice(10);

  console.log(tintsList, shadesList);

  return (
    <>
      <main className="main-page">
        <section>
          <div className="form-container row">
            <h1 className="header-primary">Generate Tints and Shades</h1>
            <p className="enter-color-code">Enter color code: eg. #539165</p>
            <div className="actions">
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#1A73E8"
                  className={`${error ? "error-invalid-input" : null}`}
                />
                <button type="submit" className="btn btn-submit">
                  Generate 🎉
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
              return <SingleColor key={color.weight} {...color} />;
            })}
          </div>
        </section>
      </main>
      <footer>
        <ToastContainer autoClose={2000} />
        <div className="footer-container row">
          <p>
            Build with 🧡 By{" "}
            <a
              href="https://github.com/serengia"
              target="_blank"
              rel="noreferrer"
            >
              James Serengia (GitHub)
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
