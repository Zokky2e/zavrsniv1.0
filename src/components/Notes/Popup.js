import React, { useEffect, useRef } from "react";
import classes from "./Popup.module.css";
function Popup(props) {
  let popupRef = useRef()

  
 useEffect(()=>{
  function exitHandler(event){
    if (props.trigger && popupRef.current && !popupRef.current.contains(event.target)) {
      props.setTrigger(false);
     }
  }
  document.addEventListener("mousedown", exitHandler)
  return()=>{
    document.removeEventListener("mousedown", exitHandler);
  }
 })


  return props.trigger ? (
    <div className={classes.popup} >
      <div ref={popupRef} className={classes.inner}>
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
