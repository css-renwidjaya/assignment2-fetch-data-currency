import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {},
    };
  }

  componentDidMount() {
    let APIKEY = "8b174d19bbdb4101936cd7886651b9af";
    fetch("https://api.currencyfreaks.com/latest?apikey=" + APIKEY)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rates: result.rates,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      crr = crr;
    }
    return crr;
  };

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map((i) => rates[i])[2];
    console.log(ratesArr);
    let table = [];
    let children = [];
    let displayedCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(ratesArr[key], 0)}</td>
            <td>{this.prettyCurrency(ratesArr[key])}</td>
            <td>{this.prettyCurrency(ratesArr[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>);

    return table;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div className="App-body">Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="App-body">Loading dulu gan hehehehe...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>* base currency is from 1 USD. (asignment 2 = rendy widjaya)</p>
          </div>
        </main>
      );
    }
  }
}

export default App;
