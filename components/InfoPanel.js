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

import * as rssParser from "react-native-rss-parser";

export default class InfoPanel extends React.Component {
	state = {};

	componentDidMount() {
		fetch(
			"https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
			{
				mode: "no-cors"
			}
		)
			.then(response => response.text())
			.then(responseData => rssParser.parse(responseData))
			.then(rss => {
				console.log(rss.title);
				console.log(rss.items.length);
			});
	}

	render() {
		return (
			<View style={styles.panel}>
				<Text style={{ textAlign: "center", fontWeight: "bold" }}>
					MARKET BUZZ
				</Text>
				<View style={styles.greetingBox}></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	panel: {
		// Fill the entire surface
		width: 350,
		height: 550,
		backgroundColor: "rgba(255, 255, 255, 0.4)"
	},
	greetingBox: {
		width: 350,
		backgroundColor: "#000000",
		borderColor: "#639dda",
		borderWidth: 2,

		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	gainers: {
		backgroundColor: "#0955a2db"
	},
	losers: {
		backgroundColor: "#d22222f7"
	},
	alignCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	stockBox: {
		width: 80,
		height: 80,
		margin: 10
	}
});
