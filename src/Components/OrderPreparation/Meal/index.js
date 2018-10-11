import React from "react";
import styles from "./styles";
import PropTypes from "prop-types";

export default class Meal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  static propTypes = {
    onMealAdded: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
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
    return (<li style={{ height: 30 }}>
                <div style={styles.name} >{this.props.name}</div>
                <div style={{float: "right"}}>
                  <button disabled={this.state.count===1} onClick={this.decreaseCount.bind(this)}>-</button>
                  <div style={styles.count} >{this.state.count}</div>
                  <button onClick={this.increaseCount.bind(this)}>+</button>
                  <button onClick={()=>this.props.onMealAdded(this.props.name, this.state.count)}>Hinzufügen</button>
                </div>
            </li>);
  }
}