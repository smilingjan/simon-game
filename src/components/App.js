import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonList";
import Timer from "./Timer";
import ButtonConfig from "../config/ButtonConfig.json";
import "./App.css";

const App = () => {
  const [activeButton, setActiveButton] = useState("");
  const [gameDirections, setGameDirections] = useState("Click to Start!");
  const [gameState, setGameState] = useState("Not Started");
  const [gamePattern, setGamePattern] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [timer, setTimer] = useState(30);

  const initGameParameters = () => {
    setActiveButton("");
    setGameDirections("Wrong Answer!");
    setGameState("Not Started");
    setGamePattern([]);
    setUserInput([]);
    setTimer(30);
  };

  // =====Game Controller=====
  useEffect(() => {
    // =====helper functions======
    // Define getting next sequence of buttons.
    const nextSequence = () => {
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = ButtonConfig.Buttons[randomNumber].color;
      setActiveButton(randomChosenColour);
      setGamePattern([...gamePattern, randomChosenColour]);
    };

    // Define a custom Async function forEach function.
    const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    // Use custom Async function to recall pattern for player, before going to next round.
    const recallPattern = async (gamePattern) => {
      await asyncForEach(gamePattern, async (pattern) => {
        await waitFor(400);
        setActiveButton(pattern);
        await waitFor(400);
        setActiveButton("");
      });
      setTimeout(() => {
        setGameState("Game Continue");
      }, 400);
    };

    // =====Game Controller=====

    // 1. Start the game
    const onBodyClick = () => {
      if (gameState === "Not Started") {
        nextSequence();
        setGameState("Game Started");
      }
    };

    // Define event listener click.
    document.body.addEventListener("click", onBodyClick, { capture: true });

    switch (gameState) {
      // 2. Set direction, reset player inputs, wait for player turn.
      case "Game Started":
        setGameDirections("Level " + gamePattern.length);
        setUserInput([]);
        setGameState("Player Turn");
        break;

      // 4. Recall the Pattern.
      case "Game Recall":
        //this works!
        recallPattern(gamePattern);
        break;

      // 5. Get Next Sequence, then assign to player
      case "Game Continue":
        setGameState("Game Started");
        nextSequence();
        break;

      default:
        break;
    }

    return () => {
      setActiveButton("");
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, [gamePattern, gameState]);

  // =====Game Controller=====
  useEffect(() => {
    // 3. Set direction, reset player inputs, wait for player turn.
    switch (gameState) {
      //Player Turn
      case "Player Turn":
        if (
          gamePattern[userInput.length - 1] === userInput[userInput.length - 1]
        ) {
          //Correctly answered, end of turn.
          if (gamePattern.length === userInput.length) {
            setTimeout(() => {
              setGameState("Game Recall");
              setGameDirections("Pattern so far");
            }, 400);
          }
        }
        //incorrectly answered, set high score and restart game.
        else {
          if (highScore < gamePattern.length) {
            setHighScore(gamePattern.length - 1);
          }
          initGameParameters();
          // const audio = new Audio("/apps/simongame/sounds/wrong.mp3");
          const audio = new Audio("/sounds/wrong.mp3");
          audio.play();
          document.body.classList.add("game-over");
          setTimeout(() => {
            document.body.classList.remove("game-over");
          }, 100);
        }
        break;

      default:
        break;
    }
  }, [gameState, gamePattern, userInput, highScore]);

  // get user input
  const checkUserInput = (color) => {
    setUserInput([...userInput, color]);
  };

  return (
    <div className="container min-vh-auto">
      <h1 id="game-directions">{gameDirections}</h1>
      <div className="container w-50">
        <div className="row text-center">
          <Timer
            gameState={gameState}
            setUserInput={setUserInput}
            userInput={userInput}
            timer={timer}
            setTimer={setTimer}
          />
          <div className="col-lg-5 text-center counter">
            High Score: {highScore}
          </div>
        </div>
        <ButtonList
          buttons={ButtonConfig.Buttons}
          activeButton={activeButton}
          gameState={gameState}
          checkUserInput={checkUserInput}
        />
      </div>
    </div>
  );
};

export default App;
