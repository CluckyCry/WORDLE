import React from "react";
import "../css/chance.css";

//components:
import Box from "./Box";

const Chance = function ({ row }) {
  let letters = row.letters;
  return (
    <div className="chance">
      <Box color={letters[0][1]} letter={letters[0][0]} />
      <Box color={letters[1][1]} letter={letters[1][0]} />
      <Box color={letters[2][1]} letter={letters[2][0]} />
      <Box color={letters[3][1]} letter={letters[3][0]} />
      <Box color={letters[4][1]} letter={letters[4][0]} />
    </div>
  );
};

export default React.memo(Chance);
