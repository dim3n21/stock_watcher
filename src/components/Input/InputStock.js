import React, { Component } from "react";
import './InputStock.scss'
import { Input } from "antd";

class InputStock extends Component {
  
  onSearch = value => {
    this.props.updateBlocks(value)
  };

  render() {
  
    const { Search } = Input;
    return (
      <div>
        <Search
          className='input'
          allowClear
          placeholder="input stock symbol"
          enterButton="ADD STOCK"
          size="large"
          onSearch={value => this.onSearch(value)}
        />
      </div>
    );
  }
}

export default InputStock;
