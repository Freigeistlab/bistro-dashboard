import React from "react";
import containerStyles from "../../common/styles/containers";
import {API, nextOrder} from "../../api/orderQueue";
import "../../index.css";
import {styles} from "./styles";
import buttonStyles from "../../common/styles/buttons";
import {Button} from "react-bootstrap";
import {ping, restartServer} from "../../api/system";

export default class SystemStatus extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      serverRunning: false,
      projectionRunning: false,
      backProjectionRunning: false,
    };

    setInterval(this.ping.bind(this), 3000);
  }

  async ping(){
    const response = await ping().catch((error) => {
      console.error('network error: ' + error);
      this.setState({
        serverRunning: false,
      });
    });

    if (response.status === 200) {
      this.setState({
        serverRunning: true,
      });
      console.log('success')
    } else {
      this.setState({
        serverRunning: false,
      });
      console.warn('error')
    }
  }

  render() {
    return (<div style={containerStyles.listContainer}>
      <h2>Status</h2>

      <div style={{alignItems: "center"}}>
        <span style={this.state.serverRunning ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Server</h4>
        <Button bsStyle="warning" onClick={restartServer} style={buttonStyles.buttonBarBtn}>Neustart</Button>
      </div>
      <div>
        <span style={this.state.projectionRunning ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Projektion</h4>
      </div>
      <div>
        <span style={this.state.projectionRunning ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Rück Projektion</h4>
      </div>
    </div>);
  }
}