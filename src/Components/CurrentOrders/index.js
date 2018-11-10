import React from "react";
import containerStyles from "../../common/styles/containers";
import { getQueuedOrders } from "../../api/orderQueue";

const mealStyle = {height: 30};

export default class OrderQueue extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orders: [],
      currentOrderIndex: 0
    };

  }

  addOrder(json_msg){
    let { orders }= this.state;
    const { name, realOrder } = json_msg;
    orders.push({name, realOrder});
    this.setState({
      orders
    });
  }

  nextOrder(json_msg){
    let { orders, currentOrderIndex }= this.state;
    const { recipe } = json_msg;
    if (currentOrderIndex+1 < orders.length){
      if (recipe === orders[currentOrderIndex+1].name){
        this.setState({currentOrderIndex: currentOrderIndex+1})
      }
    } else {
      this.setState({orders: [], currentOrderIndex: 0});
    }
  }

  clearQueue(){
    this.setState({orders: []})
  }

  async componentDidMount(){
    const orders = await getQueuedOrders();
    //console.log("Orders ", orders)
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
                  orders.length!==0?
                    orders.slice(currentOrderIndex,orders.length).map((order, index)=> <li style={mealStyle} key={index}><div style={{float: "left"}}>{order.name + " " + (order.realOrder===1 ? "" : " (vorbereiten)")}</div></li>)
                  :
                  <div/>
                }
              </ul>
            </div>);
  }
}