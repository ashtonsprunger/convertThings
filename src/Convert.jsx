import { useEffect, useState } from "react";
import convert from "convert-units";

function Convert(props) {
  // const [from, setFrom] = useState(props.measure[0]);
  // const [to, setTo] = useState(props.measure[1]);
  const [fromAbbr, setFromAbbr] = useState(props.measure[0].abbr);
  const [toAbbr, setToAbbr] = useState(props.measure[1].abbr);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    setFromValue(0);
    setToValue(0);
    setFromAbbr("");
    setToAbbr("");
  }, [props]);

  const calculate = (fromValue, fromAbbr, toAbbr) => {
    if (fromValue != undefined && fromAbbr != "" && toAbbr != "") {
      setToValue(convert(fromValue).from(fromAbbr).to(toAbbr));
    }
  };
  const reverseCalculate = (toValue) => {
    if (toValue != undefined && fromAbbr != "" && toAbbr != "") {
      setFromValue(convert(toValue).from(toAbbr).to(fromAbbr));
    }
  };
  const updateFrom = (e) => {
    setFromAbbr(e.target.value);
    calculate(fromValue, e.target.value, toAbbr);
  };
  const updateTo = (e) => {
    setToAbbr(e.target.value);
    calculate(fromValue, fromAbbr, e.target.value);
  };
  const updateFromValue = (e) => {
    setFromValue(e.target.value);
    calculate(e.target.value, fromAbbr, toAbbr);
  };
  const updateToValue = (e) => {
    setToValue(e.target.value);
    reverseCalculate(e.target.value);
  };
  const fromXClick = () => {
    setFromValue("");
    document.getElementById("fromInput").focus();
  };
  const toXClick = () => {
    setToValue("");
    document.getElementById("toInput").focus();
  };
  return (
    <div
      style={{
        display: "grid",
        gridGap: "0",
        width: "min(100%, 600px)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "40px",
          display: "flex",
          padding: "1em",
        }}
      >
        <select
          style={{ position: "relative", height: "100%", border: "none" }}
          onChange={updateFrom}
          value={fromAbbr}
        >
          <option value={""}>From</option>
          <option disabled>---</option>
          {props.measure.map((unit) => {
            return (
              <option key={unit.abbr} value={unit.abbr}>
                {unit.plural}
              </option>
            );
          })}
        </select>
        <input
          id="fromInput"
          style={{
            position: "relative",
            height: "38px",
            border: "none",
            marginLeft: "6px",
            paddingLeft: "1em",
            width: "100%",
            outline: "none",
          }}
          value={fromValue}
          type={"number"}
          onChange={updateFromValue}
        />
        <button
          onClick={fromXClick}
          style={{ width: "40px", border: "none", fontSize: "20px" }}
        >
          ✕
        </button>
      </div>
      <h2 style={{ margin: "-8px 0 0" }}>=</h2>
      <div
        style={{
          position: "relative",
          height: "40px",
          display: "flex",
          padding: "1em",
        }}
      >
        <select
          style={{ position: "relative", height: "100%", border: "none" }}
          onChange={updateTo}
          value={toAbbr}
        >
          <option value={""}>To</option>
          <option disabled>---</option>
          {props.measure.map((unit) => {
            return (
              <option key={unit.abbr} value={unit.abbr}>
                {unit.plural}
              </option>
            );
          })}
        </select>
        <input
          id="toInput"
          style={{
            position: "relative",
            height: "38px",
            border: "none",
            marginLeft: "6px",
            paddingLeft: "1em",
            width: "100%",
            outline: "none",
          }}
          value={toValue}
          type={"number"}
          onChange={updateToValue}
        />
        <button
          onClick={toXClick}
          style={{ width: "40px", border: "none", fontSize: "20px" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Convert;
