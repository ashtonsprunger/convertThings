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
        <h1>Convert Things</h1>
        <select value={measure} onChange={(e) => setMeasure(e.target.value)}>
          {measures.map((measure) => {
            return <option value={measure}>{format(measure)}</option>;
          })}
        </select>
        <Convert measure={convert().list(measure)} />
      </header>
    </div>
  );
}

export default App;
