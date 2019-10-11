import React from "react";
import "./Block.scss";
import { Icon } from "antd";

const Block = props => {
  let { name, symbol, open, high, low, price } = props.stock;

  const priceDif = (price, high) => {
    let dif = price - open;
    let difPercentage = (dif * 100) / high;
    let color = dif > 0 ? "green" : "red";
    let backgroundCol =
      dif > 0
        ? "linear-gradient(#05ff44, #02bf35)"
        : "linear-gradient(#de2100, #941600)";
    let topPadding =
      Math.floor(
        Math.abs((dif * 100) / open - (((dif * 100) / open) * 10) / 100)
      ).toString() + "%";
    let arrow =
      dif > 0 ? (
        <Icon type="arrow-up" style={{ fontSize: "0.7rem" }} />
      ) : (
        <Icon type="arrow-down" style={{ fontSize: "0.7rem" }} />
      );

    return {
      dif: dif.toFixed(2),
      difPercentage: difPercentage.toFixed(2),
      color,
      backgroundCol,
      arrow,
      topPadding
    };
  };

  priceDif(price, high);

  return (
    <div className="block">
      <div
        className="block__indicator"
        style={{
          background: priceDif(price, high).backgroundCol
        }}
      >
        <div className="block__indicator-line">
          <div
            className="block__indicator-arrow"
            style={{
              top: priceDif(price, high).topPadding
            }}
          >
            <Icon
              type="caret-right"
              style={{
                color: "#fff",
                fontSize: "1.4rem"
              }}
            />
          </div>
          <div className="block__indicator-number_1">{high}</div>
          <div className="block__indicator-number_2">{low}</div>
        </div>
      </div>
      <div className="block__numbers">
        <div className="block__numbers__title">
          <div className="block__numbers__title-name">{name}</div>
          <p className="block__numbers__title-symbol">{symbol}</p>
        </div>
        <div className="block__numbers__price">
          <div className="block__numbers__price-price">
            {price}&nbsp;&nbsp;
            </div>  
            <div
              className="block__numbers__price-dif"
              style={{
                color: priceDif(price, high).color
              }}
            >
              {priceDif(price, high).arrow}
              {priceDif(price, high).dif}
              ({priceDif(price, high).difPercentage}%)
            </div>
         </div>
        <div className="block__numbers__info">
          <div className="block__numbers__info-label">
            open <span className="block__numbers__info-number">{open}</span>
          </div>
          <div className="block__numbers__info-label">
            high <span className="block__numbers__info-number">{high}</span>
          </div>
          <div className="block__numbers__info-label">
            low <span className="block__numbers__info-number">{low}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
