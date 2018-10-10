import React from "react";

export default class OrderPreparation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const meals = ["Arrabiata", "Napoli", "Pesto"];

    return (<div>
              <ul style={{listStyle:"none"}}>
                {
                  meals.map((meal)=> <li >{meal}</li>)
                }
              </ul>
            </div>);
  }
}