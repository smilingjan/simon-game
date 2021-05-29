import React, { useEffect } from "react";

const Timer = ({ gameState, setUserInput, userInput, timer, setTimer }) => {
  // timer job
  useEffect(() => {
    let thisTimer;
    if (gameState === "Player Turn") {
      thisTimer = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      if (timer === 0) {
        setUserInput(...userInput, "wrong");
      }
    }
    return () => {
      clearInterval(thisTimer);
    };
  }, [userInput, timer, gameState, setUserInput, setTimer]);

  useEffect(() => {
    if (gameState === "Player Turn") {
      setTimer(30);
    }
  }, [userInput, gameState, setTimer]);

  return <div className="col-lg-5 text-center counter">Timer: {timer}</div>;
};

export default Timer;
