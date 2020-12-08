import React from "react";
import classes from "./Input.css";

const Input = props => {
  let inputElement = null;
  let iElClasses = [classes.InputElement];
  if (!props.valid && props.touched) {
    iElClasses.push(classes.Invalid);
  }

  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={iElClasses.join(" ")}
          {...props.config}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={iElClasses.join(" ")}
          {...props.config}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={iElClasses.join(" ")}
          value={props.config.value}
          onChange={props.changed}
        >
          {props.config.options.map(option => {
            return <option value={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={iElClasses.join(" ")}
          {...props.config}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {!props.valid && props.touched ? (
        <p className={classes.ValidationError}>
          {props.config.name + " " + props.errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
