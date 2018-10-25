import React from "react";
import containerStyles from "../../../common/styles/containers";
import PropTypes from "prop-types";
import {getRecipes} from "../../../api/orderQueue";
import Recipe from "../Recipe";

export default class Menu extends React.Component {

  constructor(props){
    super(props);
    this.onMealAdded = this.onMealAdded.bind(this);
    this.state = {
      recipes: [],
      pasta: []
    }
  }

  async componentDidMount(){
    const { recipes, pasta } = await getRecipes();
    //if we need a more fine granular ingredient selection we can use this method
    //const { recipes, pasta, toppings, decoration } = await getRecipes();
    this.setState({
      recipes,
      pasta
    });
  }

  static propTypes = {
    socket: PropTypes.object.isRequired
  };

  onMealAdded(recipe,amount){
    //const { pasta } = this.state;
    //const meal = pasta.length !== 0 ? pasta[0] + " " + recipe : "Spaghetti " + recipe;
    this.props.socket.send(JSON.stringify({action: "prepare_order", meal: recipe, amount}));
  }

  render() {
    const { recipes } = this.state;
    return (<div style={containerStyles.listContainer}>
              <h2>Gerichte vorbereiten</h2>
              <ul style={containerStyles.list}>
                {
                  recipes.map((meal, index)=> <Recipe name={meal} key={index} onOrderAdded={this.onMealAdded}/>)
                }
              </ul>
            </div>);
  }
}