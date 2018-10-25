import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import styles from "./styles";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };

    this.onMealAdded = this.onMealAdded.bind(this);
  }

  static propTypes = {
    onOrderAdded: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number
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


  onMealAdded(){
    const name = this.props.name;
    const count = this.state.count;
    this.props.onOrderAdded(name, count);
  }

  render() {
    return (<li style={{ height: 40, }}>
      <div style={styles.name} >{this.props.name}</div>
      <div style={{float: "right"}}>
        <Button disabled={this.state.count===1} onClick={this.decreaseCount.bind(this)}>-</Button>
        <div style={styles.count} >{this.state.count}</div>
        <Button onClick={this.increaseCount.bind(this)}>+</Button>
        <Button onClick={this.onMealAdded}>Hinzufügen</Button>
      </div>
    </li>);
  }
}