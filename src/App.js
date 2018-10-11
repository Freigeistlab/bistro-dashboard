import React, { Component } from 'react';
import Menu from "./Components/OrderPreparation/Menu/index";
import './App.css';
import CurrentOrders from "./Components/CurrentOrders";
import PreparedMeals from "./Components/OrderPreparation/PreparedMeals";

const socket = new WebSocket("ws://192.168.0.4:443/");

class App extends Component {
  render() {
    return (
      <div className="App" style={{alignSelf: "stretch",}}>
        <Menu socket={socket}/>
        <CurrentOrders socket={socket}/>
        <PreparedMeals socket={socket}/>
      </div>
    );
  }
}

export default App;
