import reactLogo from "./assets/react.svg";
import styles from "./css/App.module.css";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div id={styles.root}>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

export default App;