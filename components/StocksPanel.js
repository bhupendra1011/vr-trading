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

export default class StocksPanel extends React.Component {
  state = {};

  handleStockSelection() {}

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <VrButton onClick={() => this.handleStockSelection()}>
            <View style={[styles.stockBox, styles.alignCenter, styles.gainers]}>
              <Text> INFY </Text>
              <Text> 10% </Text>
            </View>
          </VrButton>
          <VrButton onClick={() => this.handleStockSelection()}>
            <View style={[styles.stockBox, styles.alignCenter, styles.gainers]}>
              <Text> SBI </Text>
              <Text> 5% </Text>
            </View>
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2,
    flexDirection: "row",
    display: "flex",
    width: "100%"
  },
  gainers: {
    backgroundColor: "#509d0a"
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
