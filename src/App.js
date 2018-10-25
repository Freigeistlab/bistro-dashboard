import React, { Component } from 'react';
import Menu from "./Components/OrderPreparation/Menu/index";
import './App.css';
import CurrentOrders from "./Components/CurrentOrders";
import PreparedMeals from "./Components/OrderPreparation/PreparedMeals";
import ButtonBar from "./Components/ButtonBar";

const socket = new WebSocket("ws://localhost:5678/");

class App extends Component {
  render() {
    return (
      <div className="App">
        <ButtonBar/>
        <div id="top_container">
          <Menu socket={socket}/>
          <CurrentOrders socket={socket}/>
          <PreparedMeals socket={socket}/>
        </div>
      </div>
    );
  }
}

export default App;
