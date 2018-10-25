import React from "react";
import PropTypes from "prop-types";
import { ToggleButton } from "react-bootstrap";

export default class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.onSelect = this.onSelect.bind(this);
  }

  static propTypes = {
    onIngredientSelected: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number
  };

  onSelect(){
    this.setState({
      selected: !this.state.selected
    });
    this.props.onIngredientSelected(this.props.name, this.props.type);
  }

  render() {
    return (<li style={{ height: 30 }}>
                <ToggleButton value={this.props.key} style={{width: '100%', marginLeft: 0}} onClick={this.onSelect}>{this.props.name}</ToggleButton>
            </li>);
  }
}