import "./app.css"; // main css file
import styles from "./css/app.module.css";

// components:
import Chance from "./components/Chance";
import Keyboard from "./components/Keyboard";
import { useEffect, useState, useRef } from "react";

// our random word:
const randWord = "CATCH";

const App = function () {
  // starting point of the game: (states)
  const [data, setData] = useState([
    {
      row: 1,
      letters: [[], [], [], [], []],
    },
    {
      row: 2,
      letters: [[], [], [], [], []],
    },
    {
      row: 3,
      letters: [[], [], [], [], []],
    },
    {
      row: 4,
      letters: [[], [], [], [], []],
    },
  ]);
  // refs:
  const currentRow = useRef(1);
  const currentBox = useRef(1);
  const status = useRef("none");
  // functions:
  function getFakeArr() {
    if (currentRow.current >= 5) return;
    let newArr = data.map((currentObj) => ({ ...currentObj }));
    let row = newArr[currentRow.current - 1];

    return [newArr, row];
  }

  function handleBackspace() {
    if (status.current != "none") return;
    if (currentRow.current >= 5) return;
    // get array of letters of the current row:
    let [newArr, row] = getFakeArr();
    let letters = row.letters;
    // check
    if (letters[currentBox.current - 2])
      letters[currentBox.current - 2][0] = "";
    currentBox.current = Math.max(currentBox.current - 1, 1);
    setData(newArr);
  }

  function handleData(key) {
    if (status.current != "none") return;
    if (currentRow.current >= 5) return;
    if (currentBox.current >= 6) return;
    // deep copy the game data:
    let [newArr, row] = getFakeArr();
    // update the rowLetters, and set the data to the new array we created:
    row.letters[currentBox.current - 1][0] = key.toUpperCase();
    currentBox.current++;
    setData(newArr);
  }

  function handleKeys(key){
    if (key === "Backspace") {
      handleBackspace();
      return;
    } else if (key === "Enter") {
      // handling the enter now:
      if (status.current != "none") return;
      if (currentRow.current >= 5) return;

      let [newArr, row] = getFakeArr(); // gets deep copied array
      // loop:
      let isRowComplete = true;
      row.letters.forEach((arr) => {
        if (!arr[0] || arr[0] == "") isRowComplete = false;
      });

      if (!isRowComplete) return; // they haven't finished with their row

      // we loop (split the word first):
      let guessed = true;
      let splitWord = randWord.split("");
      let colors = {
        success: "seagreen",
        misplace: "#cdc35e",
        absent: "#3d3029",
      };

      row.letters.forEach((arr, ind) => {
        if (arr[0] === splitWord[ind]) {
          splitWord[ind] = "";
          guessed = guessed && true;
          arr[1] = colors.success;
        }
        // two diff conditions:
        else if (splitWord.find((l) => l === arr[0])) {
          // find the index of this element:
          let index = splitWord.findIndex((l) => l === arr[0]);
          splitWord[index] = ""; // setting that index to '' so it doesn't count for the next iteration for the same letter
          // setting guessed to false
          guessed = false;
          arr[1] = colors.misplace;
        } else {
          guessed = false;
          arr[1] = colors.absent;
        }
      });

      // this is where we set the state:
      if (guessed) status.current = "won";
      else if (currentRow.current >= 4) status.current = "lost";
      // set the color (aka the data which will rerender the component):
      setData(newArr);
      // finished with the row:
      currentRow.current++; // proceed to next row
      currentBox.current = 1; // start from the first box
    }
    if (key.length === 1 && key.match(/[a-z]/i)) handleData(key);
  }

  useEffect(() => {
    const func = (event) => handleKeys(event.key)
    window.addEventListener("keydown", func);
    // clean up:
    return () => {
      window.removeEventListener("keydown", func);
    };
  }, []);

  return (
    <div className={styles.screenContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.chances}>
          {data.map((obj, ind) => (
            <Chance key={ind} row={obj} />
          ))}
        </div>
        <div style={{color: (status.current != 'none') && 'white'}} className={styles.result}>
          {(status.current === "won" && "You guessed it!") ||
            (status.current === "lost" && "You didn't guess the word!") || 'none'}
        </div>
        <Keyboard func={handleKeys} />
      </div>
    </div>
  );
};

export default App;
