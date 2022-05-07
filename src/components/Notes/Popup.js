import React from "react";
import classes from "./Popup.module.css";
function Popup(props) {
  return props.trigger ? (
    <div className={classes.popup}>
      <div className={classes.inner}>
        <button
          className={classes.button}
          onClick={() => {
            props.setTrigger(false);
          }}
        >&#10005;</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
