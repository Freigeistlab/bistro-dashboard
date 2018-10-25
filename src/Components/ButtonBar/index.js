import React from "react";
import {clearQueue, nextOrder, nextIngredients} from "../../api/orderQueue";
import buttonStyles from "../../common/styles/buttons";
import { Button, ButtonToolbar } from "react-bootstrap";

export default class ButtonBar extends React.Component {

  constructor(props){
    super(props);
    this.onClearQueue = this.onClearQueue.bind(this);
  }


  onClearQueue(){
    let shouldBeDeleted = window.confirm("Sicher, dass alle Bestellungen gelöscht werden sollen?");
    if (shouldBeDeleted){
      clearQueue();
    }
  }

  render() {
    return (<div style={{display: 'flex', alignItems: "center",justifyContent: 'center', marginTop: 30}}>
      <ButtonToolbar>
        <Button bsStyle="success" onClick={nextOrder} style={buttonStyles.buttonBarBtn}>Nächste Bestellung</Button>
        <Button bsStyle="success" onClick={nextIngredients} style={buttonStyles.buttonBarBtn}>Nächste Zutat</Button>
        <Button bsStyle="success" onClick={this.onClearQueue} style={buttonStyles.buttonBarBtn}>Bestellungen löschen</Button>

      </ButtonToolbar>

    </div>);
  }
}