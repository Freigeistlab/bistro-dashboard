import React from "react";
import containerStyles from "../../common/styles/containers";
import { API } from "../../api/orderQueue";
import "../../index.css";
import {styles} from "./styles";

export default class SystemStatus extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      raspberry1Running: false,
      raspberry2Running: false,
    };

    setInterval(this.ping.bind(this), 3000);
  }

  ping(){
    API.get('')
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            raspberry1Running: true,
          });
          console.log('success')
        } else {
          this.setState({
            raspberry1Running: false,
          });
          console.warn('error')
        }
      })
      .catch((error) => {
        console.error('network error: ' + error);
        this.setState({
          raspberry1Running: false,
        });
      })
  }

  render() {
    return (<div style={containerStyles.listContainer}>
      <h2>Status</h2>

      <div style={{alignItems: "center"}}>
        <span style={this.state.raspberry1Running ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Raspberry1</h4>
      </div>
      <div>
        <span style={this.state.raspberry2Running ? styles.dot : styles.dotInactive}></span>
        <h4 style={styles.raspberryStatus}>Raspberry2</h4>
      </div>
    </div>);
  }
}