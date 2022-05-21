import React, { useState } from "react";
import classes from "./ToggleSwitch.module.css";

function ToggleSwitch(props) {
    const [checked, setChecked]=useState(!props.darkMode);
  return (
    <label className={classes.switch}>
      <input value={checked} onChange={()=>{setChecked(!checked); props.changeMode(checked)}}type="checkbox"/>
      <span className={classes.slider}></span>
    </label>
  );
}

export default ToggleSwitch;
