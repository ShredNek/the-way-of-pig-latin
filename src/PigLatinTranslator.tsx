import React, { useState } from "react";
import { BsArrowRight, BsArrowDown } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";

const PigLatinTranslator: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [latinResults, setLatinResults] = useState(
    "Your translation appears here!"
  );

  // ? A bunch of helper functions to make the code so much more readable
  function wordHasTrailingPunct(w: string) {
    if (
      w[w.length - 1] === "," ||
      w[w.length - 1] === "." ||
      w[w.length - 1] === "!" ||
      w[w.length - 1] === "?"
    ) {
      return true;
    }
    return false;
  }

  function wordWithPunct(w: string) {
    if (w[0] === "a")
      return w.slice(1, w.length - 1).concat(`'ay${w[w.length - 1]}`);

    return w.slice(1, w.length - 1).concat(`'${w[0]}ay${w[w.length - 1]}`);
  }

  function wordWithCapsAndPunct(w: string) {
    return w
      .charAt(1)
      .toUpperCase()
      .concat(w.slice(2, w.length - 1))
      .concat(`'${w[0].toLowerCase()}ay${w[w.length - 1]}`);
  }

  function wordWithCapAndNoPunct(w: string) {
    let preCapCheck = w.charAt(1).toUpperCase().concat(w.slice(2));

    if (w[0] === "A") return preCapCheck.concat(`'${w[0].toLowerCase()}y`);

    return preCapCheck.concat(`'${w[0].toLowerCase()}ay`);
  }

  function wordAllUppercase(w: string) {
    return /^[A-Z]+$/.test(w);
  }

  function capsWord(w: string) {
    if (w[0] === "A") return w.slice(1).concat(`'AY`);
    return w.slice(1).concat(`'${w[0]}AY`);
  }

  function regularWord(w: string) {
    if (w[0] === "a") return w.slice(1).concat(`'ay`);
    return w.slice(1).concat(`'${w[0]}ay`);
  }

  function oneLetterWord(w: string) {
    if (wordAllUppercase(w)) return w.concat("'AY");
    return w.concat("'ay");
  }

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value);
    setLatinResults(translateUserInput(e.target.value));
  }

  function translateUserInput(uI: string) {
    if (uI === undefined || uI === "") return "Your translation appears here!";

    let aT = uI.split(" ").map((w) => {
      if (w === "") return "";
      if (w.length === 1) return oneLetterWord(w);
      if (wordAllUppercase(w)) return capsWord(w);
      if (w[0] === w[0].toUpperCase()) {
        if (wordHasTrailingPunct(w)) return wordWithCapsAndPunct(w);
        return wordWithCapAndNoPunct(w);
      }
      if (wordHasTrailingPunct(w)) return wordWithPunct(w);
      return regularWord(w);
    });

    let translation = aT.join(" ");
    return translation;
  }

  function handleCopy() {
    if (latinResults === "Your translation appears here!")
      navigator.clipboard.writeText("");
    navigator.clipboard.writeText(latinResults);
  }

  return (
    <div className="container">
      <h2>Type in what you want to translate!</h2>
      <div className="translator">
        <div className="user-input-title">
          <h2>English</h2>
          <BsArrowRight id="arrow-right" />
          <BsArrowDown id="arrow-down" />
          <h2>Pig-latin</h2>
        </div>
        <div className="user-input-and-response">
          <textarea
            value={userInput}
            onChange={(e) => handleOnChange(e)}
            placeholder="Say something..."
          />
          <p>{latinResults}</p>
          <AiOutlineCopy id="copy-icon" onClick={handleCopy}></AiOutlineCopy>
        </div>
      </div>
    </div>
  );
};

export default PigLatinTranslator;
