import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
		<button 
			className="square"
			onClick={props.onClick}
			id={props.id}
		>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i) {
    return (
		<Square
		show = {this.props.show}
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			id = {i}
			/>
		);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares:Array(9).fill(null),
			}],
			stepNumber: 0,
			show: false,
			xIsNext:true,
		}
	}
	handleclick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares)||squares[i]){return;}
		squares[i] = this.state.xIsNext ? `X`:`O`;
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
			show: !this.state.show,
		});
		// console.log(this.state.squares);
	}
	jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const moves = history.map((step,move)=>{
			const desc = move ?
			`Перейти к ходу#` + move :
			`К началу игры`;
			return(
				<li key={move}>
					<button onClick = {()=> this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;

		if (winner){
			status = `Выйграл ` + winner;
		} else{
			status ='Следующий ход : ' +
			(this.state.xIsNext ? `  X`:` O`);
		}
		
    return (
      <div className="game">
        <div className="game-board">
          <Board
						show = {this.state.show}
						squares = {current.squares}
						onClick = {(i)=> this.handleclick(i)}
					/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			const comb = document.querySelectorAll(`.square`);
			comb.forEach((item,index)=>{
				if(index === (a||b||c)){
					item.classList.add(`winner`);
				}return comb
			})
			console.log(comb);
			return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
