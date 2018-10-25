import React from "react";
import containerStyles from "../../common/styles/containers";


export default class CurrentRecipe extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      recipe: "",
      inUse: [],
      waiting: [],
      finished: []
    };

  }

  nextIngredient(json_msg){
    console.log("Next ingredient")
    const { recipe, ingredients } = json_msg;
    let inUse = [];
    let finished = [];
    let waiting = [];

    Object.keys(ingredients).forEach((i)=> {
      if (ingredients[i]==="use"){
        inUse.push(i);
      } else if (ingredients[i]==="finished"){
        finished.push(i);
      } else if (ingredients[i]==="waiting"){
        waiting.push(i);
      }
    });
    this.setState({
      inUse,
      waiting,
      finished,
      recipe
    });
  }

  render() {
    const { inUse, waiting, finished, recipe } = this.state;
    return (<div style={containerStyles.listContainer}>
              <h2>Aktuelle Zubereitung</h2>
              <h3>{recipe}</h3>
              <h3>Aktuelle Zutat</h3>
              <ul style={containerStyles.list}>
                {
                  inUse.map((ingredient) => <li><div>{ingredient}</div></li>)
                }
              </ul>
              <h3>Nächste Zutaten</h3>
              <ul style={containerStyles.list}>
                {
                  waiting.map((ingredient) => <li><div>{ingredient}</div></li>)
                }
              </ul>
              <h3>Abgearbeitete Zutaten</h3>
              <ul style={containerStyles.list}>
                {
                  finished.map((ingredient) => <li><div>{ingredient}</div></li>)
                }
              </ul>
            </div>);
  }
}