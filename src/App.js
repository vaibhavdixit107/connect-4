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

//Setting the initial State 
//History: Will keep a track of all board states so far. 
//ColumnHeight: This array will keep track of how many discs are present in the particular so far. 
//ColumnHeight[i] represents the number of discs in column i on board. 
//The index will help us to keep track the location where the next disc should go in case a move in
//Fixing bug with initial state. const would not let us mutate the state on reset.
let initialState = {
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
    this.state = JSON.parse(JSON.stringify(initialState));// Making a copy of initial state for mutation of state.
  }

  //To handle the click to make the move in the grid
  handleClick(i){
    this.makeMove(i)
  }

  //This function is used when a winner is detected and we want to restart the game again.
  reset(){
    this.setState(JSON.parse(JSON.stringify(initialState)));  // bug fix: using copy of initial state to reset
  }

  //This function handles all moves in the game.
  makeMove(columnId){
    let {columnHeight} = this.state;
    let {history} = this.state;
    let {winner} = this.state;
    let {stepNumber} = this.state;
    let {isNextRed} = this.state;

    //In case a winner is detected we don't want enable any further moves in the game 
    if(winner !== ""){
      return;
    }

    //Making the copy of the current board for mutation
    const boardCopy = history[stepNumber].boardState.map(function(arr) {
      return arr.slice();
    });

    //To start filling the box from bottom
    let newColumnHeight = boardCopy[columnId].reverse();
    
    /*this condition will be true when we are in a historical state and try to make a move on the board. 
    Slicing the history will prune the history till the step we are on so that it creates historical timeline again from the step. 
    For example,
    If we have played 6 steps till now and we go back to 3 step and again make a move on board from that state, 
    this will prune the history array to step three and then we will this move as step 4 in the history array.*/
    if(history.length > stepNumber+1 ){
      history = history.slice(0,stepNumber+1);
    } 
    
    //this condition will be false only if there is no more space in particular column for disc(Invalid move)
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
      this.setState({winner : winner});
    }
  }

  //To track the history of the game
  trackHistory(boardState,index){
    if(index!=null){
      let {history} = this.state;
      let board = this.state.history[index].boardState;
      let columnHeightArray = [];// array for the current height of the column
      for(let i=0;i<board.length;i++){
        //making copy of current column
        let currentBoard = board[i].slice();
        //Using 0 instead of null that was causing the bug changing it to null
        //and reverse the column height again to find the exact height of the column
        //which was reversed initially to make the move. This fixes the bug.
        let currentColumnHeight = currentBoard.reverse().findIndex(f => f === null);
        if(currentColumnHeight <= 0){
          columnHeightArray.push(0);
        }else{
          columnHeightArray.push(currentColumnHeight);
        }  
      }
      
      return(
        this.setState({
          stepNumber : index,
          history : history,
          isNextRed : (index % 2) === 0,
          columnHeight : columnHeightArray
        })
      )
    }
  }

  // To update the component to set the winner
  componentDidUpdate(){
    let {history} = this.state;
    let {stepNumber} = this.state;
    let winner = this.hasWinner(history[stepNumber].boardState);
    if(this.state.winner !== winner){
      this.setState({winner: winner})
    }
  }  

  // to check which line wins
  isLineWins(a,b,c,d) {
    return ((a !== null) && (a === b) && (a === c) && (a === d));
  } 

  //checking for the winner
  hasWinner(boardState) {
    //checking if the winner is row
    for (let column = 0; column < 7; column++){
      for (let row = 0; row < 4; row++){
        if (this.isLineWins(boardState[column][row], boardState[column][row+1], boardState[column][row+2], boardState[column][row+3])){
          return boardState[column][row] + ' wins!'
        }    
      }
    }
    //checking if the winner is column
    for (let row = 0; row < 6; row++){
      for (let column = 0; column < 4; column++){
        if (this.isLineWins(boardState[column][row], boardState[column+1][row], boardState[column+2][row], boardState[column+3][row])){
          return boardState[column][row] + ' wins!'
        }   
      }
    }
    //checking winner for the right diagonal
    for (let row = 0; row < 3; row++){
      for (let column = 0; column < 4; column++){
        if (this.isLineWins(boardState[column][row], boardState[column+1][row+1], boardState[column+2][row+2], boardState[column+3][row+3])){
          return boardState[column][row] + ' wins!'
        }
      }       
    }
    //checking winner for the left diagonal
    for (let row = 0; row < 4; row++){
      for (let column = 3; column < 6; column++){
        if (this.isLineWins(boardState[column][row], boardState[column-1][row+1], boardState[column-2][row+2], boardState[column-3][row+3])){
          return boardState[column][row] + ' wins!'
        }
      }
    }             

    return "";
  }

  render() {
    const {stepNumber} = this.state;
    const {history} = this.state;
    let board = this.state.history[stepNumber].boardState;
    let columns = [...Array(board.length)].map((x, i) => 
      <ColumnHeight 
        key={i}
        holes={board[i]}
        handleClick={() => this.handleClick(i)}>
      </ColumnHeight>
    )
  //Tracking the move index
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move} className="History">
          <button onClick={() => this.trackHistory(step.boardState,move)} className="btnMove">{desc}</button>
        </li>
      );
    });

    return (
    <div>
      <B.Button bsStyle="primary" bsSize="large" onClick={()=>this.reset()} className="btnMove">Reset</B.Button>{/*Button to reset the game to initial state*/}
      <div className="Board">
        {columns}{/* Drawing the columns*/}
      </div>
      <p>{moves}</p>{/*Displaying the move index in the button*/}
      <div>
      <h1>{this.state.winner}</h1>{/*Displaying the winner*/}
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
