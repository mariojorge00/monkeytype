import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [words, setWords] = useState("");
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    setWords("hola buenas como estamos hoy hace un dia maravilloso");
    document
      .querySelectorAll("input")
      .forEach((input) =>
        input.setAttribute("size", input.getAttribute("placeholder").length / 2)
      );
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
    // console.log(
    //   document
    //       .getElementsByClassName("word")
    //       [activeWord].getElementsByClassName("incorrect").length
    // );
    // console.log( e.target.value.slice(0, e.target.value.length-1));
    // console.log(words.split(" ")[activeWord])
    setCurrentValue(e.target.value.slice(-1)[0]);
    if (
      e.target.value.slice(-1)[0] === " " &&
      words.split(" ").length > activeWord + 1
    ) {
      e.preventDefault();
      if (
        e.target.value.slice(0, e.target.value.length - 1) !==
          words.split(" ")[activeWord] ||
        document
          .getElementsByClassName("word")
          [activeWord].getElementsByClassName("incorrect").length !== 0
      ) {
        document
          .getElementsByClassName("word")
          [activeWord].classList.add("word-incorrect");
      }
      setActiveWord((prevState) => prevState + 1);
      document.getElementsByTagName("input")[activeWord + 1].focus();
    }
    // console.log(words.split(" ")[activeWord]);

    words
      .split(" ")
      [activeWord].split("")
      .map((letter, index) => {
        const letterSpan = document
          .getElementsByClassName("word")
          [activeWord].getElementsByClassName("letter")[index].classList;

        if (!e.target.value[index]) {
          letterSpan.remove("correct");
          letterSpan.remove("incorrect");
          // console.log('null')
        } else if (letter === e.target.value[index]) {
          letterSpan.add("correct");
          letterSpan.remove("incorrect");
          // console.log(e.target.value)
        } else if (
          letter !== e.target.value[index] &&
          e.target.value[index] !== " "
        ) {
          letterSpan.add("incorrect");
          letterSpan.remove("correct");
        }
      });
    // console.log(words.split(" ")[activeWord])
  }

  const handleKeyDown = (e) => {
    // console.log(document.getElementsByClassName("word"));
    if (
      e.key === "Backspace" &&
      e.target.value.length === 0 &&
      activeWord !== 0
    ) {
      setActiveWord((prevState) => prevState - 1);
      document.getElementsByTagName("input")[activeWord - 1].focus();
      document
        .getElementsByClassName("word")
        [activeWord - 1].classList.remove("word-incorrect");
    }
    const extraSpan = document.createElement("span");
    if (
      words.split(" ")[activeWord].length <= e.target.value.length &&
      e.key !== "Backspace" &&
      e.key !== " " &&
      e.key.length === 1
    ) {
      document
        .getElementsByClassName("word")
        [activeWord].appendChild(extraSpan);
      extraSpan.innerHTML = e.key;
      extraSpan.classList.add("letter");
      extraSpan.classList.add("incorrect");
      extraSpan.classList.add("extra");
    }
    if (
      e.key === "Backspace" &&
      words.split(" ")[activeWord].length < e.target.value.length
      //  &&
      // document
      //   .getElementsByClassName("word")
      //   [activeWord].lastChild.classList.contains("extra")
    ) {
      document
        .getElementsByClassName("word")
        [activeWord].removeChild(
          document.getElementsByClassName("word")[activeWord].lastChild
        );
    }
    // if (e.target.value.length === 0) {
    //   document
    //     .getElementsByClassName("word")
    //     [activeWord].removeChild(
    //       document
    //         .getElementsByClassName("word")
    //         [activeWord].lastChild
    //     );
    // }
  };

  const handleInputClick = () => {
    document.getElementsByTagName("input")[activeWord].focus();
    console.log(activeWord);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header"></div>
        <div className="main">
          <div className="input-display" onClick={handleInputClick}>
            {words.split(" ").map((word, index) => (
              <>
                <span
                  key={index}
                  id={index}
                  className="word"
                  onClick={handleInputClick}
                >
                  {word.split("").map((e, idx) => (
                    <span key={idx} id={idx} className="letter">
                      {e}
                    </span>
                  ))}
                </span>
                <span> </span>
              </>
            ))}
          </div>
          <div className="inputs">
            {words.split(" ").map((input, index) => (
              <input
                key={index}
                id={index}
                placeholder={input}
                type="text"
                className="input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></input>
            ))}
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
