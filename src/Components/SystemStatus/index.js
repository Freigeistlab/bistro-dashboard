import React from "react";
import containerStyles from "../../common/styles/containers";
import {API, nextOrder} from "../../api/orderQueue";
import "../../index.css";
import {styles} from "./styles";
import buttonStyles from "../../common/styles/buttons";
import {Button} from "react-bootstrap";
import {ping, restartServer, refreshFrontProjection, refreshBackProjection} from "../../api/system";

export default class SystemStatus extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      serverRunning: false,
      projectionRunning: false,
      backProjectionRunning: false,
      serverNotReachableCount: 0
    };

    setInterval(this.ping.bind(this), 3000);
    this.refreshProjections = this.refreshProjections.bind(this);
  }

  async ping(){
    const response = await ping().catch((error) => {
      console.error('network error: ' + error);
      this.setState({
        serverRunning: false,
      });
      setTimeout(function(){
        window.location.reload();
      }, 5000);
    });
    if (response){
      if (response.status === 200) {

        if (this.state.serverNotReachableCount===3){
          window.location.reload();
        }

        this.setState({
          serverRunning: true,
          serverNotReachableCount: 0
        });
        console.log('success')
      } else {
        this.setState({
          serverRunning: false,
          serverNotReachableCount: this.state.serverNotReachableCount+1
        });
        console.warn('error')
      }
    }
  }

  refreshProjections(){
    this.props.socket.send(JSON.stringify({action: "refresh"}));
  }

  render() {
    return (<div style={containerStyles.listContainer}>
      <h2>Status</h2>
        <div>
        <span style={this.state.serverRunning ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Server</h4>
        <Button bsStyle="warning" onClick={restartServer} style={buttonStyles.buttonBarBtn}>Neustart</Button>
      </div>
      <div>
        <h4 style={styles.raspberryStatus}>Projektionen</h4>
        <Button bsStyle="warning" onClick={this.refreshProjections} style={buttonStyles.buttonBarBtn}>Refresh</Button>
      </div>
    </div>);
  }
}