import React from "react";
import containerStyles from "../../common/styles/containers";
import { getQueuedOrders } from "../../api/orderQueue";

const mealStyle = {height: 30};

export default class CurrentOrders extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orders: [],
      currentOrderIndex: 0
    };

    this.props.socket.onmessage = (message) => {
      if (message.data){
        console.log("Message ", message, new Date().toISOString());
        let { orders }= this.state;
        const json_msg = JSON.parse(message.data);
        switch(json_msg.action){
          case "new_order":
            orders.push(json_msg.recipe);
            this.setState({
              orders
            });
            break;
        }
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
    const { orders, currentOrderIndex } = this.state;
    return (<div style={containerStyles.listContainer}>
              <h2>Bestellungen</h2>
              <ul style={containerStyles.list}>
                {
                  orders.slice(currentOrderIndex,orders.length).map((meal, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{meal}</div></li>)
                }
              </ul>
            </div>);
  }
}