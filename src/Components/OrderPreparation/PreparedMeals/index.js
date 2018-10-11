import React from "react";
import containerStyles from "../../../common/styles/containers";


const mealStyle = {height: 30};

export default class PreparedMeals extends React.Component {


  render() {
    const meals = [{meal:"Arrabiata", count:3}, {meal:"Napoli", count:2}, {meal:"Pesto",count:2}];

    return (<div style={containerStyles.listContainer}>
      <h2>Vorbereitete Gerichte</h2>
      <ul style={containerStyles.list}>
        {
          meals.map((meal, index)=> <li style={mealStyle} key={index}>
                                      <div style={{float: "left"}}>{meal.meal + " "}</div>
                                      <div style={{float: "right"}}>{meal.count}</div>
                                    </li>)
        }
      </ul>
    </div>);
  }
}