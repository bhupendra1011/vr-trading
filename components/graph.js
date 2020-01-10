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
		volume: ""
	};

	componentDidMount() {
		let data = this.props.data;
		if (!data) return;
		const timeSeries = data["Time Series (1min)"];
		const metaData = data["Meta Data"];
		const keys = Object.keys(timeSeries);
		const latestData = timeSeries[keys[0]];
		this.setState({
			symbol: metaData["2. Symbol"],
			open: Number(latestData["1. open"]).toFixed(2),
			close: Number(latestData["4. close"]).toFixed(2),
			high: Number(latestData["2. high"]).toFixed(2),
			low: Number(latestData["3. low"]).toFixed(2),
			volume: Number(latestData["5. volume"]).toFixed(2)
		});
	}
	render() {
		return (
			<View style={styles.graphContainer}>
				<View>
					<Text style={[styles.graphLabel, { paddingTop: 10 }]}>
						{this.state.symbol}
					</Text>
					<Text style={styles.stats}>High : {this.state.high}</Text>
					<Text style={styles.stats}>Low : {this.state.low}</Text>
					<Text style={styles.stats}>Open : {this.state.open}</Text>
					<Text style={styles.stats}>Close : {this.state.close}</Text>
					<Text style={styles.stats}>Volume : {this.state.volume}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	graphContainer: {
		width: 400,
		height: 400,
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
	},
	alignCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});
