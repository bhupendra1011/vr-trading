import React from "react";
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";

import StockCard from "./components/Card";

import StocksPanel from "./components/StocksPanel";
import InfoPanel from "./components/InfoPanel";
import StocksChart from "./components/graph";
import NewsPanel from "./components/NewsPanel";

export default class vr_trading extends React.Component {
	state = {
		activeStock: "",
		accountBalance: 10000,
    	activeStockData: null
	};
	defaultQuantity = 10;

	handleStockSelection(state) {
		this.setState(state);
	}

	getStockPrice () {
		const series = this.state.activeStockData["Time Series (1min)"];
		const keys = Object.keys(series);
		return Number.parseFloat(series[keys[0]]["1. open"], 10);
	}

	buyStock () {
		const price = this.getStockPrice();
		this.setState({accountBalance: this.state.accountBalance - (price * this.defaultQuantity)});
	}

	sellStock() {
		const price = this.getStockPrice();
		this.setState({accountBalance: this.state.accountBalance + (price * this.defaultQuantity)});
	}

	render() {

		let stockInfo;
		if(this.state.activeStock) {
			stockInfo = <View>
							<StocksChart data={this.state.activeStockData} />
							<View style={styles.buttonBox}>
								<Text style={styles.bigFont}>Quantity: {this.defaultQuantity}</Text>
								<VrButton onClick={this.buyStock.bind(this)}>
									<View style={[styles.button, styles.buttonBuy, styles.alignCenter]}>
										<Text style={styles.bigFont}>BUY</Text>
									</View>
								</VrButton>
								<VrButton onClick={this.sellStock.bind(this)}>
									<View style={[styles.button, styles.buttonSell, styles.alignCenter]}>
										<Text style={styles.bigFont}>SELL</Text>
									</View>
								</VrButton>
							</View>
						</View>;
		} else {
			stockInfo = <View style={[styles.graphContainer, styles.alignCenter]}>
				<Text style={styles.bigFont}>No stock selected! </Text>
			</View>
		}
		return (
			<View style={styles.panel}>
				<View style={styles.panelBox}>
					<Text style={styles.bigFont}> IT Stocks </Text>
					<StockCard symbol='INFY' exchange='NSE' handleStockSelection={this.handleStockSelection.bind(this)} />
					<StockCard symbol='TCS' exchange='NSE' handleStockSelection={this.handleStockSelection.bind(this)} />
				</View>

				<View style={styles.centerPanel}>
					<View style={[styles.funds, styles.alignCenter]}>
						<Text style={styles.bigFont}>Funds: {this.state.accountBalance.toFixed(2)}</Text>
					</View>
					{stockInfo}
				</View>

				<View style={styles.panelBox}>
					<Text> BANK Stocks </Text>
					<StockCard symbol="SBIN" exchange="NSE" handleStockSelection={this.handleStockSelection.bind(this)} />
					<StockCard symbol="YESBANK" exchange="NSE" handleStockSelection={this.handleStockSelection.bind(this)} />
				</View>
			</View>
		);
	}
}

// Stocks panel , need to be moved

const styles = StyleSheet.create({
	panel: {
		// Fill the entire surface
		width: 1000,
		height: 600,
		backgroundColor: "rgba(255, 255, 255, 0.4)",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	centerPanel: {
		flexDirection: "column",
		alignItems: 'center'
	},
	funds: {
		width: 300,
		height: 100,
		backgroundColor: '#545454',
		marginBottom: 10
	},
	graphContainer: {
		width: 400,
		height: 200,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "#24292e",
		justifyContent: 'space-around'
	},
	panelBox: {
		padding: 20,
		backgroundColor: "#5373a3",
		borderColor: "#639dda",
		borderWidth: 2
	},
	buttonBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		backgroundColor: "#24292e",
		width: 400,
		height: 100 
	},
	button: {
		width: 80,
		height: 80
	},
	buttonBuy: {
		backgroundColor: 'blue'
	},
	buttonSell: {
		backgroundColor: 'grey'
	},
	alignCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	stockBox: {
		width: 80,
		height: 80
	},
	bigFont: {
		fontSize: 20,
		fontWeight: 'bold'
	},

	gainers: {
		backgroundColor: "#509d0a"
	},
	losers: {
		backgroundColor: "#d22222f7"
	},
	hide: {
		opacity: 0
	},
	show: {
		opacity: 1
	}
});

AppRegistry.registerComponent("vr_trading", () => vr_trading);
AppRegistry.registerComponent("StocksPanel", () => StocksPanel);
AppRegistry.registerComponent("InfoPanel", () => InfoPanel);
AppRegistry.registerComponent("NewsPanel", () => NewsPanel);
