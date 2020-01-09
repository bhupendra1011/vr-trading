import React from "react";
import {
	asset,
	AppRegistry,
	Environment,
	StyleSheet,
	Text,
	View,
	VrButton
} from "react-360";

export default class StocksChart extends React.Component {
	state = {
		symbol: "",
		open: "",
		close: "",
		high: "",
		low: "",
		volume: "",
		seriesData: []
	};

	componentDidMount() {
		fetch("http://api.myjson.com/bins/11uqom")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				const timeSeries = data["Time Series (1min)"];
				const metaData = data["Meta Data"];
				const keys = Object.keys(timeSeries);
				const latestData = timeSeries[keys[[keys.length - 1]]];
				console.log(latestData);
				console.log(metaData);
				this.setState({
					symbol: metaData["2. Symbol"],
					seriesData: timeSeries,
					open: Number(latestData["1. open"]).toFixed(2),
					close: Number(latestData["4. close"]).toFixed(2),
					high: Number(latestData["2. high"]).toFixed(2),
					low: Number(latestData["3. low"]).toFixed(2),
					volume: Number(latestData["5. volume"]).toFixed(2)
				});
			});
	}
	render() {
		return (
			<View style={styles.graphContainer}>
				<View>
					<Text style={styles.graphLabel}>Stock Stats</Text>
					<Text style={styles.graphLabel}>{this.state.symbol}</Text>
					<Text style={styles.stats}>High : {this.state.high}</Text>
					<Text style={styles.stats}>Low : {this.state.low}</Text>
					<Text style={styles.stats}>Open : {this.state.open}</Text>
					<Text style={styles.stats}>Close : {this.state.close}</Text>
					<Text style={styles.stats}>Volume : {this.state.volume}</Text>
				</View>
				<View>
					<Text>Graph will be here</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	graphContainer: {
		width: 300,
		height: 500,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "#24292e"
	},
	graphLabel: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10
	},
	stats: {
		textAlign: "left",
		marginLeft: "25%",
		marginBottom: 10,
		fontWeight: "bold"
	}
});
