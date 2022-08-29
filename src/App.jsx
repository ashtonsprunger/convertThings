import logo from "./logo.svg";
import "./App.css";
import convert from "convert-units";
import Convert from "./Convert";
import { useState } from "react";

function App() {
  const measures = convert().measures();
  const [measure, setMeasure] = useState(measures[0]);
  const format = (string) => {
    const str = string.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
      return str.toUpperCase();
    });
    return str;
  };
  return (
    <div className="App">
      <header className="App-header">
        <select value={measure} onChange={(e) => setMeasure(e.target.value)}>
          {measures.map((measure) => {
            return <option value={measure}>{format(measure)}</option>;
          })}
        </select>
        <Convert measure={convert().list(measure)} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
