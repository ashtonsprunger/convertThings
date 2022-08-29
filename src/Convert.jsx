import { useEffect, useState } from "react";
import convert from "convert-units";

function Convert(props) {
  const [from, setFrom] = useState(props.measure[0]);
  const [to, setTo] = useState(props.measure[1]);
  const [fromAbbr, setFromAbbr] = useState("");
  const [toAbbr, setToAbbr] = useState("");
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
    setFromValue(convert(toValue).from(toAbbr).to(fromAbbr));
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
  return (
    <div>
      <div>
        <select onChange={updateFrom} value={fromAbbr}>
          <option value={""}>From</option>
          <option />
          {props.measure.map((unit) => {
            return <option value={unit.abbr}>{unit.plural}</option>;
          })}
        </select>
        <input value={fromValue} type={"number"} onChange={updateFromValue} />
      </div>
      <div>
        <select onChange={updateTo} value={toAbbr}>
          <option value={""}>To</option>
          <option />
          {props.measure.map((unit) => {
            return <option value={unit.abbr}>{unit.plural}</option>;
          })}
        </select>
        <input value={toValue} type={"number"} onChange={updateToValue} />
      </div>
    </div>
  );
}

export default Convert;
