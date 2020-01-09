import React from 'react';
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";

export default class StockCard extends React.Component {
    
    symbol =  this.props.exchange ? `${this.props.exchange}:${this.props.symbol}`: this.props.symbol;
    apiKey1 = 'FVKV400PBKCNFBZR';
    apiKey2 = 'YX4YAD802OGS4WIL'; // this is getting used only once hence can be used further
    state = {
        previousClose: 0,
        currentPrice: 0
    }

    currentPriceCache = [];

    componentWillMount () {

        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    setTimer () {
        this.timerId = setInterval(() => this.updateCurrentPrice(), 60000);
    }

    changeBackground () {
        const card = this.refs.card;
        this.state.currentPrice > this.state.previousClose ?
            card.classList.add('positive') : card.classList.add('negative');
    }

    updateCurrentPrice () {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey1}`)
        .then(results => results.json())
            .then((data) => {
                let series = data["Time Series (1min)"];
                let todayPrice;
                if(series) {
                    let counter = 0;
                    for (var key in series) {
                        if(counter > 0){
                            break;
                        } else {
                            todayPrice = Number.parseFloat(series[key]["1. open"], 10);
                        }
                        counter++;
                    }
                    this.currentPriceCache.push(todayPrice); 
        
                } else {
                    console.log(data);
                    //no data from API, use cached data
                    console.log(this.currentPriceCache);
                    let length = this.currentPriceCache.length;
                    if (length) {
                        let randomInd = Number.parseInt(Math.random()*length);
                        todayPrice = this.currentPriceCache[randomInd];
                    }
                }
                if(todayPrice) {
                    this.setState({ currentPrice: todayPrice });
                    //this.changeBackground();
                    //if(this.timerId)clearTimeout(this.timerId);
                }
                !this.timerId && this.setTimer();
            });
    }

    fetchData () {
        
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey2}`)
        .then(results => results.json())
            .then((data) => {
                let series = data["Time Series (Daily)"];
                let counter = 0;
                let previousClose;
                for (var key in series) {
                    if(counter > 1){
                        break;
                    } else if (counter === 1){
                        previousClose = Number.parseFloat(series[key]["4. close"], 10);
                    }
                    counter++;
                }
                this.setState({ previousClose: previousClose });
                this.updateCurrentPrice ();
                
            });
    }

    handleStockSelection (symbol) {
        console.log(symbol);
    }

    render () {
      return (

        <VrButton onClick={() => this.handleStockSelection('INFY')}>
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