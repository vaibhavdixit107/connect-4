import React, { Component } from 'react';
import './App.css';
import * as B from 'react-bootstrap';

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
  
  //To reset the state of the game to initial state
  reset(){
    this.setState(initialState);  
  }
  //To handle the click to make the move in the grid
  handleClick(i){
    this.makeMove(i)
  }

  //To make the move in the board
  makeMove(columnId){
    let {columnHeight} = this.state;
    let {history} = this.state;
    let {stepNumber} = this.state;
    let {isNextRed} = this.state;

    

    const boardCopy = history[stepNumber].boardState.map(function(arr) {
      return arr.slice();
    });

    //To start filling the box from bottom
    let newColumnHeight = boardCopy[columnId].reverse();
    
    //Slice the history to the step clicked
    if(history.length > stepNumber+1 ){
      history = history.slice(0,stepNumber+1);
    } 

    if(columnHeight[columnId] < 6){  
      boardCopy[columnId][columnHeight[columnId]] = isNextRed ? 'Red':'Blue';
      newColumnHeight.reverse();
      history.push({boardState:boardCopy});
      columnHeight[columnId]++;
      stepNumber++;
      isNextRed = isNextRed?false:true;

      this.setState({history : history});
      this.setState({stepNumber : stepNumber});
      this.setState({isNextRed : isNextRed });
      this.setState({columnHeight : columnHeight});
    }
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
      <B.Button bsStyle="primary" bsSize="large" onClick={()=>this.reset()} className="btnMove">Reset</B.Button>{/*Button to reset the game to initial state*/}
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
