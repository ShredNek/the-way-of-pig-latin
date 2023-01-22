import "./App.css";
import PigLatinTranslator from "./PigLatinTranslator";

function App() {
  return (
    <main>
      <div className="background-1"></div>
      <div className="background-2"></div>
      <div className="app-ui">
        <h1>The way of Pig Latin</h1>
        <PigLatinTranslator></PigLatinTranslator>
      </div>
    </main>
  );
}

export default App;
