import React from "react";
import containerStyles from "../../common/styles/containers";
import { getQueuedOrders } from "../../api/orderQueue";

const mealStyle = {height: 30};

export default class CurrentOrders extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orders: []
    };

    this.props.socket.onmessage = (message) => {
      if (message.data){
        console.log("Message", message);
        let { orders }= this.state;
        const json_msg = JSON.parse(message.data);
        //orders.push(json_msg.recipe);
        /*this.setState({
          orders
        })*/
      }
    }
  }

  async componentDidMount(){
    const orders = await getQueuedOrders();
    console.log("Orders ", orders)
    this.setState({
      orders
    })
  }

  render() {

    return (<div style={containerStyles.listContainer}>
              <h2>Bestellungen</h2>
              <ul style={containerStyles.list}>
                {
                  this.state.orders.map((meal, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{meal}</div></li>)
                }
              </ul>
            </div>);
  }
}