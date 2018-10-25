import React from "react";
import styles from "./styles";
import PropTypes from "prop-types";

export default class AddOrderButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  static propTypes = {
    onOrderAdded: PropTypes.func.isRequired,
  };

  decreaseCount = () => {
    this.setState({
      count: this.state.count-1
    });
  };

  increaseCount = () => {
    this.setState({
      count: this.state.count+1
    });
  };

  render() {
    return (
      <div style={{float: "right"}}>
        <button disabled={this.state.count===1} onClick={this.decreaseCount.bind(this)}>-</button>
        <div style={styles.count} >{this.state.count}</div>
        <button onClick={this.increaseCount.bind(this)}>+</button>
        <button onClick={()=>this.props.onOrderAdded(this.state.count)}>Bestellung aufgeben</button>
      </div>
    );
  }
}