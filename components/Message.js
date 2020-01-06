import React from "react";
import { Text } from "react-360";
class Message extends React.Component {
  constructor() {
    super();
    this.state = { message: "This is initial message , will get updated" };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ message: "Hello Updated Message" });
    }, 5000);
  }
  render() {
    return <Text style={this.props.style}>{this.state.message}</Text>;
  }
}

export default Message;
