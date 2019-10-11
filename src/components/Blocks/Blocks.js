import React from "react";
import "./Blocks.scss";
import Block from "./Block/Block";

const Blocks = props => {
  let stocks = props.arrayOfStocks;

  return (
    <div className="blocks">
      {stocks.map(s => (
        <Block key={s.id} stock={s} />
      ))}
    </div>
  );
};

export default Blocks;
