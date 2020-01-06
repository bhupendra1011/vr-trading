import React from "react";
import Message from "./components/Message";
import { AppRegistry, StyleSheet, Text, View } from "react-360";

export default class vr_trading extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}> Welcome to React 360 World !! </Text>
        </View>
        <View style={styles.greetingBox}>
          <Message style={styles.greeting}></Message>
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
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2
  },
  greeting: {
    fontSize: 20,
    color: "red"
  }
});

AppRegistry.registerComponent("vr_trading", () => vr_trading);
