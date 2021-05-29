import React from "react";
import Button from "./Button";

const ButtonList = ({ buttons, activeButton, gameState, checkUserInput }) => {
  // let rows = [];
  // let cols = [];

  // buttons.forEach((button, index) => {
  //   if ((index + 1) % 2 === 0) {
  //     cols.push(button.color);
  //     rows.push(cols);
  //     cols = [];
  //   } else {
  //     cols.push(button.color);
  //   }
  // });

  // Prepare the buttons before being mapped
  const rows = buttons.reduce((rows, key, index) => {
    return (
      (index % 2 === 0
        ? rows.push([key.color])
        : rows[rows.length - 1].push(key.color)) && rows
    );
  }, []);

  // Map the buttons into 2x2 grid
  const renderedList = rows.map((row, index) => {
    return (
      <div key={index} className="row">
        {row.map((col, index) => {
          return (
            <div key={index} className={`col-lg-6 text-center`}>
              <Button
                color={col}
                activeButton={activeButton}
                gameState={gameState}
                checkUserInput={checkUserInput}
              ></Button>
            </div>
          );
        })}
      </div>
    );
  });

  return <div className="row">{renderedList}</div>;
};

export default ButtonList;
