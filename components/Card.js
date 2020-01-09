import React from 'react';
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";

export default class StockCard extends React.Component {
    
    symbol =  this.props.exchange ? `${this.props.exchange}:${this.props.symbol}`: this.props.symbol;
    apiKey2 = 'FVKV400PBKCNFBZR';
    apiKey1 = 'YX4YAD802OGS4WIL'; // this is getting used only once hence can be used further
    state = {
        previousClose: 0,
        currentPrice: 0,
        stockData: {}
    }

    currentPriceCache = [];
    stockDataCache = [];

    componentDidMount () {

        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    setTimer () {
        this.timerId = setInterval(() => this.updateCurrentPrice(), 60000);
    }

    updateCurrentPrice () {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey1}`)
        .then(results => results.json())
            .then((data) => {
                console.log(`Updating ${this.symbol} price`);
                let series = data["Time Series (1min)"];
                const keys = Object.keys(series);
                let todayPrice;
                if(series) {
                    todayPrice = Number.parseFloat(series[keys[0]]["1. open"], 10);
                    this.currentPriceCache.push(todayPrice);
                    this.stockDataCache.push(data); 
        
                } else {
                    console.log(data);
                    //no data from API, use cached data
                    console.log(this.currentPriceCache);
                    let length = this.currentPriceCache.length;
                    if (length) {
                        let randomInd = Number.parseInt(Math.random()*length);
                        todayPrice = this.currentPriceCache[randomInd];
                        data = this.stockDataCache[randomInd];
                    }
                }
                if(todayPrice) {
                    this.setState({ currentPrice: todayPrice, stockData: data });
                }
                !this.timerId && this.setTimer();
            });
    }

    fetchData () {
        
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey2}`)
        .then(results => results.json())
            .then((data) => {
                let series = data["Time Series (Daily)"];
                const keys = Object.keys(series);
                let previousClose = Number.parseFloat(series[keys[1]]["4. close"], 10);
                this.setState({ previousClose: previousClose });
                this.updateCurrentPrice ();
                
            });
    }

    render () {
      return (

         <VrButton onClick={() => this.props.handleStockSelection({activeStock: this.props.symbol, activeStockData: this.state.stockData })}>
          <View style={[styles.stockBox, styles.alignCenter, this.state.currentPrice > this.state.previousClose ? styles.gainers : styles.losers]}>
            <Text > {this.props.symbol} </Text>
            <Text>{this.state.currentPrice.toFixed(2)}</Text>
            <Text> { ((this.state.currentPrice - this.state.previousClose)*100/this.state.previousClose).toFixed(2)}% </Text>
          </View>
         </VrButton>
      )
  }
  } 
  const styles = StyleSheet.create({
    alignCenter: {
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center'
  
    },
    stockBox: {
      width: 150,
      height: 150,
      margin: 10
    },

    gainers: {
      backgroundColor: "#509d0a",
    },

    losers: {
        backgroundColor: "#d22222f7"
      }
  
  });