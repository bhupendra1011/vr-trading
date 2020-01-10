import React from 'react';
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";

export default class StockCard extends React.Component {
    
    symbol =  this.props.exchange ? `${this.props.exchange}:${this.props.symbol}`: this.props.symbol;
   
    apiKeys = [
        'FVKV400PBKCNFBZR',
        'YX4YAD802OGS4WIL',
        'U4KK41787O3UIZ07',
        'YZL3MILDPY3Y4L4M',
        'V26027KLDLIY0BTV',
        'O7MU5JCORTYTEBCD',
        'W1Z2JCTMUX4KXR5J',
        '08SPT8HBN0B66WOH',
        'WJSZDVIH8TQYGHM8',
        '0B0KWQXP8F94VGQK',
        '06M5KWRGK34MXG0X',
        '05UE8LHCXSK2IW6X',
        'S01AOCNTFVI6GYO1',
        '06IH36Y4BCRLEUX1',
        'CN3P9SH8XBEQILM3',
        '8Z9ZLOC2MA0K1NRC',
        'QQMCUDYCRDURDV91',
        '17XZDG71ADZJLUNM',
        'RY9CNCIET1BVZ8T3',
        'SEVGF67LD8DR94UM',
        'UEM4RG2GFD5TRM6Y',
        '9LQSP5XYP50SZR9E',
        '38Q5V28HSSSVJTT9',
        '0WXVR4U6PTJMOJYB',
        'XGI2ECXS555PO44Y',
        'VRLLQRCFPKOOK45I',
        'B8P4EBK0YAOTMUVG'
    ];
    state = {
        previousClose: 0,
        currentPrice: 0,
        stockData: {}
    }

    currentPriceCache = [];
    stockDataCache = [];

    componentWillMount() {
          this.fetchPreviousDayData();
    }

    componentDidMount () {
        this.timerId = setInterval(() => this.updateCurrentPrice(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    getRandomKey() {
         let randomInd = Number.parseInt(Math.random()*this.apiKeys.length);
        return this.apiKeys[randomInd];
    }

    updateCurrentPrice () {
        //  
        let key = this.getRandomKey();
        console.log('random key: '+key);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=1min&apikey=${key}`)
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
                    
                    //console.log(this.currentPriceCache);
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
            });
    }

    fetchPreviousDayData () {
        let key = 'MNEDEDZUGFB50C92';
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&interval=1min&apikey=${key}`)
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