import React, { Component } from 'react';
import './Game.css';
import PressMe from './PressMe';
import PropTypes from 'prop-types';
export default class Game extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      pattern:[],
    }
  }

  handleClick(e){
    e.preventDefault();
    const clicked = e.target;
    const originalColor = clicked.style.backgroundColor;
    clicked.style.backgroundColor = 'yellow';
    clicked.style.transform = 'rotate(0.125turn)';
    clicked.style.transition = '.5s';
    //wait half a second for transition to complete before setting it back
    setTimeout(() => {
      clicked.style.backgroundColor = originalColor;
      clicked.style.transform='rotate(0turn)';
      clicked.style.transition='.5s'}, 
      500); 
  }
  
  spin(color){
    console.log('spin color id', color.id);
    const colorToSpin = document.getElementById(color.id);
    const originalColor = colorToSpin.style.backgroundColor;
    colorToSpin.style.backgroundColor = 'yellow';
    colorToSpin.style.transform = 'rotate(0.125turn)'
    colorToSpin.style.transition = '.5s';
    //wait half a second for transition to complete before setting it back
    setTimeout(() => {
     colorToSpin.style.backgroundColor = originalColor;
     colorToSpin.style.transform='rotate(0turn)';
     colorToSpin.style.transition='.5s'}, 
       500); 
  }
  updatePattern(){
    //get a random color to be added to the array
    let newColor = this.getRandomColor();
    //add the new color to the pattern
    this.setState({
      pattern: this.state.pattern.concat(newColor)
    })
    console.log(this.state.pattern);
  }

  getRandomColor(){
    //get a random number from 0 to 3
    const ranNum = Math.floor(Math.random() * 4);
    //return a random color based on the random number
    if (ranNum === 0){
      return 'redSquare';
    } else if (ranNum === 1) {
      return 'blueSquare';
    } else if (ranNum === 2) {
      return 'greenSquare';
    } else {
      return 'orangeSquare';
    }
  }

  showPattern(){
    //rotate buttons to show the current pattern that is stored
    const { pattern } = this.state;
    // we don't want to spin each button at the same time so we use a setTimeout
    // this is tricky though, when mapped each element is given the same timeout and they all start together
    // to get around this multiple the iteration by 1 second...effectively adding 1 second to each element even though
    // they all start their countdown at the same time
    pattern.map((item, i) => { setTimeout(() => {this.spin(document.getElementById(item))}, i * 1000);
    });
  }
  
  render(){
    const pattern=this.state.pattern;
    this.showPattern();
    pattern.length === 0 ? this.getRandomColor() : console.log(`pattern is ${pattern}`);
    return(
      <div>
        <h2>You know the game, play it</h2>
        <PressMe id='redSquare' color='red' handleClick={(e) => this.handleClick(e)} /><PressMe id= 'blueSquare' color='blue' handleClick={(e) => this.handleClick(e)} /><br />
        <PressMe id='greenSquare' color='green' handleClick={(e) => this.handleClick(e)} /><PressMe id='orangeSquare' color='orange'handleClick={(e) => this.handleClick(e)} /><br />
        <button className='startButton' onClick={() => this.updatePattern()}>Update Pattern</button>
      </div>
    );
  }
}
Game.defaultProps = {
  pattern: ['red']
}

Game.propTypes = {
  pattern: PropTypes.array
};