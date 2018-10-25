import React from "react";
import Recipe from "../Recipe";
import containerStyles from "../../../common/styles/containers";
import PropTypes from "prop-types";
import { getRecipes } from "../../../api/orderQueue";
import {ingredientTypes} from "../../../constants/constants";
import AddOrderButton from "../AddOrderButton";
import { ToggleButtonGroup, ButtonToolbar, ToggleButton} from "react-bootstrap";

export default class Menu extends React.Component {

  constructor(props){
    super(props);
    this.onIngredientSelected = this.onIngredientSelected.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.state = {
      recipes: [],
      pasta: [],
      toppings: [],
      decoration: [],
      selected: {
        pasta: undefined,
        recipe: undefined,
        toppings: [],
        decoration: []
      }
    }
  }

  async componentDidMount(){
    const { recipes, pasta, toppings, decoration } = await getRecipes();
    this.setState({
      recipes,
      pasta,
      toppings,
      decoration
    });
  }

  static propTypes = {
    socket: PropTypes.object.isRequired
  };

  onIngredientSelected(ingredient, type, isAdded){
    switch(type){
      case ingredientTypes.PASTA:
        this.setState({
          selected: {pasta: ingredient}
        });
        break;
      case ingredientTypes.RECIPE:
        this.setState({
          selected: {recipe: ingredient}
        });
        break;
      case ingredientTypes.TOPPINGS:
        let { toppings } = this.state.selected;
        if (isAdded){
          toppings.push(ingredient);
        } else {
          const ind = toppings.indexOf(ingredient);
          toppings.splice(ind,1);
        }
        this.setState({
          selected: {toppings}
        });
        break;
      case ingredientTypes.DECORATION:
        let { decoration } = this.state.selected;
        if (isAdded){
          decoration.push(ingredient);
        } else {
          const ind = decoration.indexOf(ingredient);
          decoration.splice(ind,1);
        }
        this.setState({
          selected: {decoration}
        });
        break;
    }
  }

  onOrder(amount){
    const meal = this.state.selected.pasta + " " + this.state.selected.recipe + " " + ','.join(this.state.selected.toppings)
    this.props.socket.send(JSON.stringify({action: "prepare_order", meal, amount}));
  }

  render() {
    //const recipes = ["Spaghetti Arrabiata", "Spaghetti Napoli", "Spaghetti Pesto", "Spaghetti Bolognese"];
    const { recipes, pasta, toppings, decoration } = this.state;
    return (<div style={containerStyles.listContainer}>
              <h2>Gerichte vorbereiten</h2>
              <h3>Pasta auswählen</h3>
      <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="pastas">

                <ul style={containerStyles.list}>
                  {
                    pasta.map((meal, index)=> <Recipe name={meal} type={ingredientTypes.PASTA} key={index} onIngredientSelected={this.onIngredientSelected}/>)
                  }
                </ul>

              </ToggleButtonGroup>
      </ButtonToolbar>
              <h3>Sauce auswählen</h3>
      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="recipes">

              <ul style={containerStyles.list}>
                {
                  recipes.map((meal, index)=> <Recipe name={meal} type={ingredientTypes.RECIPE} key={index} onIngredientSelected={this.onIngredientSelected}/>)
                }
              </ul>
        </ToggleButtonGroup>
      </ButtonToolbar>
              <h3>Toppings auswählen</h3>
      <ButtonToolbar>
        <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
              <ul style={containerStyles.list}>
                {/*
                  toppings.map((meal, index)=> <Ingredient name={meal} type={ingredientTypes.TOPPINGS} key={index} onIngredientSelected={this.onIngredientSelected}/>)
                  */
                }
                {/*
                  decoration.map((meal, index)=> <Ingredient name={meal} type={ingredientTypes.DECORATION} key={index} onIngredientSelected={this.onIngredientSelected}/>)
                */}
                <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
                <ToggleButton value={2}>Checkbox 2</ToggleButton>
                <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>

              </ul>

        </ToggleButtonGroup>
      </ButtonToolbar>
              <AddOrderButton onOrderAdded={this.onOrder}/>

            </div>);
  }
}