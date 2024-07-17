import styles from "../css/keyboard.module.css";

const Keyboard = function ({ func }) {
  // return a div (keyboard)
  // func is the function to call when a button is clicked on:
  let keys = [
    "Q","W","E","R","T","Y",
    "U","I","O","P","A","S",
    "D","F","G","H","J","K",
    "L","Enter","Z","X","C","V",
    "B","N","M",
  ]; // DON'T OPEN THIS OR YOU'LL BE FLABBERGASTED

  return (
    <div className={styles.keyboard}>
      {keys.map((key, ind) => (
        <input
          key={ind}
          onClick={(event) => func(event.target.value)}
          className={styles.btn}
          type="button"
          value={key}
        />
      ))}
      <input onClick={() => func('Backspace')} className={`${styles.btn} ${styles.backspace}`} type="button" />
    </div>
  );
};

export default Keyboard;
