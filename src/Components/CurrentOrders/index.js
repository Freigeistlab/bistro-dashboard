import React from "react";
import containerStyles from "../../common/styles/containers";
import { getQueuedOrders } from "../../api/orderQueue";

const mealStyle = {height: 30};

export default class OrderQueue extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orders: [],
      mockOrders: [],
      currentRealOrderIndex: 0,
      currentMockOrderIndex: 0
    };

  }

  addOrder(json_msg){
    let { orders, mockOrders }= this.state;
    const { name, realOrder } = json_msg;
    if (realOrder){
      orders.push(name);
      this.setState({
        orders
      });
    } else {
      mockOrders.push(name);
      this.setState({
        mockOrders
      });
    }

  }

  nextOrder(json_msg){
    let { orders, currentRealOrderIndex, currentMockOrderIndex, mockOrders }= this.state;
    const { recipe } = json_msg;
    if (currentRealOrderIndex+1 < orders.length){
      console.log("next order", recipe, orders[currentRealOrderIndex]);
      if (recipe === orders[currentRealOrderIndex]){
        this.setState({currentRealOrderIndex: currentRealOrderIndex+1})
      }
    } else {
      this.setState({orders: [], currentRealOrderIndex: 0});
      if (currentMockOrderIndex+1 < mockOrders.length){
        console.log("next order", recipe, mockOrders[currentMockOrderIndex]);
        if (recipe === mockOrders[currentMockOrderIndex]){
          this.setState({currentMockOrderIndex: currentMockOrderIndex+1})
        }
      } else {
        this.setState({mockOrders: [], currentMockOrderIndex: 0});
      }
    }
  }

  clearQueue(){
    this.setState({
      orders: [],
      mockOrders: []
    });
  }

  async componentDidMount(){
    const allOrders = await getQueuedOrders();
    //console.log("Orders ", orders)
    let orders = [];
    let mockOrders = [];
    for (let i = 0; i<allOrders.length; i++){
      let order = allOrders[i];
      if (order.realOrder){
        orders.push(order.name);
      } else {
        mockOrders.push(order.name);
      }
    }

    this.setState({
      orders,
      mockOrders
    })
  }

  render() {
    const { orders, mockOrders, currentRealOrderIndex, currentMockOrderIndex } = this.state;
    return (<div style={containerStyles.listContainer}>
              <h2>Bestellungen</h2>
              <ul style={containerStyles.list}>
                {
                  orders.length!==0?
                    orders.slice(currentRealOrderIndex,orders.length).map((order, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{order}</div></li>)
                  :
                  <div/>

                }
                {
                  mockOrders.length!==0?
                    mockOrders.slice(currentMockOrderIndex,mockOrders.length).map((order, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{order + " (vorbereiten)"}</div></li>)
                    :
                    <div/>
                }
              </ul>
            </div>);
  }
}