import React from "react";
import {
	asset,
	AppRegistry,
	Environment,
	StyleSheet,
	Text,
	View,
	Video
} from "react-360";

export default class NewsPanel extends React.Component {
	state = {};

	render() {
		return (
			<View style={styles.panel}>
				<Video
					style={{ height: 400, width: 600 }}
					source={asset("/news.mp4")}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	panel: {
		// Fill the entire surface
		width: 600,
		height: 600,
		backgroundColor: "rgba(255, 255, 255, 0.4)",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	greetingBox: {
		padding: 20,
		backgroundColor: "black",
		borderColor: "#639dda",
		borderWidth: 2,
		width: 400
	},
	alignCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});
