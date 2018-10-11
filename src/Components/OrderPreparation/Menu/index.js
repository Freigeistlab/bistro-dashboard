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
    for (let i=0;i<amount;i++){
      if (this.props.socket){
        this.props.socket.send("New Order " + meal);
      }
    }
  }

  render() {
    const meals = ["Arrabiata", "Napoli", "Pesto"];

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