import React from "react";
import classes from "./BuildControl.css";

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.More}
        onClick={props.add}
        disabled={props.disableMore}
      >
        More{" "}
      </button>
      <button
        className={classes.Less}
        onClick={props.remove}
        disabled={props.disabled}
      >
        Less
      </button>
      {/* {props.disableMore ? <p>Max Limit Reached</p> : null} */}
    </div>
  );
};

export default React.memo(BuildControl);
