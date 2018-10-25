import React from "react";
import {clearQueue, nextOrder} from "../../api/orderQueue";
import buttonStyles from "../../common/styles/buttons";
import { Button, ButtonToolbar } from "react-bootstrap";

export default class ButtonBar extends React.Component {

  constructor(props){
    super(props);

  }

  onNextOrder(){
    //inform backend
    //inform CurrentOrders component and update the current order state
  }

  render() {
    return (<div style={{alignSelf:"center", marginTop: 30}}>
      <ButtonToolbar>
        <Button bsStyle="success" onClick={nextOrder} style={buttonStyles.buttonBarBtn}>Nächste Bestellung</Button>
        <Button bsStyle="success" style={buttonStyles.buttonBarBtn}>Nächste Zutat</Button>
        <Button bsStyle="success" onClick={clearQueue} style={buttonStyles.buttonBarBtn}>Bestellungen löschen</Button>

      </ButtonToolbar>

    </div>);
  }
}