import React, { Component } from 'react';
import './App.css';


//Making the Squares in the grid
function Square(props) {
  return (
    <div className="Square">
      <div className={props.value}>{props.value}</div>      
    </div>
  );
}

//Making the columns 
function ColumnHeight(props){
  return <div  onClick={() => props.handleClick()}>
    {[...Array(props.holes.length)].map((x, j) => 
      <Square key={j} value={props.holes[j]}></Square>)}
    </div>
}

// Setting the initial State 
const initialState = {
  history:[
        {
          boardState: new Array(7).fill(new Array(6).fill(null)),
        }
      ],
      index:0,
      stepNumber:0,
      isNextRed: true,
      columnHeight:new Array(7).fill(0),
      winner: ''
}


//making the board for the game
class Board extends Component {
  constructor() {
    super();
    this.state = JSON.parse(JSON.stringify(initialState));// Make a copy of the initial state
  }
  
  render() {
    const {stepNumber} = this.state;
    let board = this.state.history[stepNumber].boardState;
    let columns = [...Array(board.length)].map((x, i) => 
      <ColumnHeight 
        key={i}
        holes={board[i]}
        handleClick={() => this.handleClick(i)}>
      </ColumnHeight>
    )
 
    return (
    <div>
 
      <div className="Board">
        {columns}{/* Drawing the columns*/}
      </div>
 
    </div>  
    );


  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Game">
          <Board></Board>
        </div>
      </div>
    );
  }
}

export default App;
