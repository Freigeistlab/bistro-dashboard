import React, { Component } from 'react';
import Menu from "./Components/OrderPreparation/Menu/index";
import './App.css';
import CurrentOrders from "./Components/CurrentOrders";
import PreparedMeals from "./Components/OrderPreparation/PreparedMeals";
import ButtonBar from "./Components/ButtonBar";
import CurrentRecipe from "./Components/CurrentRecipe";

const socket = new WebSocket("ws://localhost:5678/");

class App extends Component {

  constructor(props){
    super(props);

    this.currentOrders = React.createRef();
    this.currentRecipe = React.createRef();


    //here we handle extra orders and requests that were added (either via orderbird or the dashboard)
    socket.onmessage = (message) => {
      if (message.data){
        console.log("Message ", message, new Date().toISOString());

        const json_msg = JSON.parse(message.data);
        switch(json_msg.action){
          case "new_order":
            this.currentOrders.current.addOrder(json_msg);
            break;
          case "next_order":
            this.currentOrders.current.nextOrder(json_msg);
            break;
          case "clear_queue":
            this.currentOrders.current.clearQueue();
            break;
          case "next_ingredient":
            this.currentRecipe.current.nextIngredient(json_msg);
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <ButtonBar/>
        <div id="top_container">
          <Menu socket={socket}/>
          <CurrentOrders socket={socket} ref={this.currentOrders}/>
          <CurrentRecipe socket={socket} ref={this.currentRecipe}/>
          <PreparedMeals socket={socket}/>

        </div>
      </div>
    );
  }
}

export default App;
