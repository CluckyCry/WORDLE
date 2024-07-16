import React, { useEffect, useState } from "react";
import "../css/box.css"; // css

const Box = function ({ color, letter, delay }) {
  return (
    <div className="box" style={{backgroundColor: color}}>{letter}</div>
  )
};

export default React.memo(Box);
