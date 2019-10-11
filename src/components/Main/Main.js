import React, { Component } from "react";
import cuid from "cuid";
import StockService from "../../services/stock-service";

import Header from "../Header/Header";
import Blocks from "../Blocks/Blocks";
import InputStock from "../Input/InputStock";

class Main extends Component {
  state = {
    stocks: [
      {
        id: "ck1mjgc3q00013q60whfp75go",
        name: "Microsoft",
        symbol: "MSFT",
        open: 137.31,
        high: 138.68,
        low: 136.98,
        price: 113.24
      }
    ]
  };

  stockService = new StockService();

  componentDidMount() {
    this.updateBlocks('AAPL');
    this.updateBlocks('NFLX');
    this.updateBlocks('AMZN');
  }

  // Additional function to update the state
  onStockLoaded = (stock, name) => {
    const newStock = {
      id: cuid(),
      name: name,
      symbol: stock.symbol,
      open: stock.open,
      high: stock.high,
      low: stock.low,
      price: stock.price
    };

    const newStocksArray = this.state.stocks;
    newStocksArray.push(newStock);

    this.setState({
      ...this.state,
      stocks: newStocksArray
    });
  };

  // Update state with the new Stock
  async updateBlocks(stockName) {
    try {
      let names = await this.stockService.getNameOfTheStock(stockName);
      let quotes = await this.stockService.getQuoteEndpointRequest(stockName);
      let name = names["2. name"];
      this.onStockLoaded(quotes, name);
    } catch (e) {
      console.log(e);
    }
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        <Header title="Stock Watcher" />
        <InputStock
          updateBlocks={stockName => {
            this.updateBlocks(stockName);
          }}
        />
        <Blocks arrayOfStocks={this.state.stocks} />
      </div>
    );
  }
}

export default Main;
