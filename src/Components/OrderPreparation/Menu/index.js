import React from "react";
import Meal from "../Meal";
import containerStyles from "../../../common/styles/containers";
import PropTypes from "prop-types";

export default class Menu extends React.Component {

  constructor(props){
    super(props);
    this.onMealAdded = this.onMealAdded.bind(this);
  }

  static propTypes = {
    socket: PropTypes.object.isRequired
  };

  onMealAdded(meal,amount){
    this.props.socket.send(JSON.stringify({action: "prepare_order", meal, amount}));
  }

  render() {
    const meals = ["Spaghetti Arrabiata", "Spaghetti Napoli", "Spaghetti Pesto", "Spaghetti Bolognese"];

    return (<div style={containerStyles.listContainer}>
              <h2>Gerichte vorbereiten</h2>
              <ul style={containerStyles.list}>
                {
                  meals.map((meal, index)=> <Meal name={meal} key={index} onMealAdded={this.onMealAdded}/>)
                }
              </ul>
            </div>);
  }
}