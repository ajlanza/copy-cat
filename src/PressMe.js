import React, { Component } from 'react';

export default class PressMe extends Component {

  render(){ 
    const color = this.props.color;
    return (
    <button 
      id={`${color}Square`}
      style={{backgroundColor: color}}
      onClick={this.props.handleClick}>
      PressMe</button>    
  );
  }
}