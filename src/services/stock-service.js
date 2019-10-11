export default class StockService {
  _APIkey = "HY0JP87WH3PG17X6";

  async getResourse(url) {
    const res = await fetch(`${url}${this._APIkey}`);

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${url}${this._APIkey}, received ${res.status}`
      );
    }
    return await res.json();
  }

  // Get the prices of a stock
  async getQuoteEndpointRequest(name) {
    const stock = await this.getResourse(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=${this._APIkey}`
    );
    return this._transformStock(stock);
  }

  // Get the name of the stock
  async getNameOfTheStock(name) {
    const nameObj = await this.getResourse(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${this._APIkey}`
    );

    return nameObj.bestMatches[0];
  }

  // Transform API Data
  _transformStock(stock) {
    return {
      symbol: stock["Global Quote"]["01. symbol"],
      open: parseFloat(stock["Global Quote"]["02. open"]),
      high: parseFloat(stock["Global Quote"]["03. high"]),
      low: parseFloat(stock["Global Quote"]["04. low"]),
      price: parseFloat(stock["Global Quote"]["05. price"])
    };
  }
}

