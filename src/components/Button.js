import React, { useState, useEffect, useCallback } from "react";
import "../components/Button.css";

const Button = ({ color, activeButton, gameState, checkUserInput }) => {
  const [pressed, setPressed] = useState(false);

  const animate = useCallback(() => {
    setPressed(true);
    // const audio = new Audio("/apps/simongame/sounds/" + color + ".mp3");
    const audio = new Audio("/sounds/" + color + ".mp3");
    audio.play();
    setTimeout(() => {
      setPressed(false);
    }, 150);
  }, [color]);

  useEffect(() => {
    if (color === activeButton) {
      animate();
    }
  }, [activeButton, color, animate]);

  const onButtonClick = () => {
    if (gameState === "Player Turn") {
      animate();
      checkUserInput(color);
    }
  };

  return (
    <div
      className={`btn ${color} ${pressed ? "pressed" : ""}`}
      onClick={onButtonClick}
    ></div>
  );
};

export default Button;
