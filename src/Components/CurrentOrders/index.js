import React from "react";
import containerStyles from "../../common/styles/containers";

const mealStyle = {height: 30};

export default class CurrentOrders extends React.Component {

  render() {
    const orders = ["Arrabiata", "Napoli", "Pesto","Arrabiata", "Napoli", "Pesto","Napoli", "Pesto"];

    return (<div style={containerStyles.listContainer}>
              <h2>Bestellungen</h2>
              <ul style={containerStyles.list}>
                {
                  orders.map((meal, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{meal}</div></li>)
                }
              </ul>
            </div>);
  }
}