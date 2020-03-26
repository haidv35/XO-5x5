import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Board from "./Board.js";
import "./index.css";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.player1Score = 0;
        this.player2Score = 0;
        this.state = {
            history: [
                {
                    squares: Array(25).fill(null)
                }
            ],
            stepNumber: 0,
            playerX: true,
            score: {
                player1: 0,
                player2: 0
            }
        };
    }
    updateScore() {
        let winner = calculateWinner(
            this.state.history[this.state.stepNumber].squares
        );
        if (winner === "X") {
            this.player1Score += 1;
        } else if (winner === "O") {
            this.player2Score += 1;
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let squares = current.squares.slice();
        if (squares[i] || checkDraw(squares) || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.playerX ? "X" : "O";
        this.setState({
            history: history.concat({squares: squares}),
            stepNumber: history.length,
            playerX: !this.state.playerX
        });
    }
    jumpTo(index) {
        if (index === 0) {
            this.setState({
                history: [{squares: this.state.history[0].squares}],
                stepNumber: index,
                playerX: index % 2 === 0
            });
        } else {
            this.setState({
                stepNumber: index,
                playerX: index % 2 === 0
            });
        }
    }
    render() {
        this.updateScore();
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares;
        const winner = calculateWinner(squares);
        const draw = checkDraw(squares);
        const player = this.state.playerX ? "X" : "O";

        const moves = history.map((move, index) => {
            return (
                index > 0 && (
                    <button
                        className="rollback"
                        key={index}
                        onClick={() => this.jumpTo(index)}
                    >
                        Move #{index}
                    </button>
                )
            );
        });
        return (
            <Fragment>
                <div className="status-bar">
                    {winner ? (
                        <div className="status" style={{color: "red"}}>
                            Winner: {winner}
                        </div>
                    ) : draw === true ? (
                        <div className="status">Draw</div>
                    ) : (
                        <div className="status">Player: {player}</div>
                    )}
                    <button className="rollback" onClick={() => this.jumpTo(0)}>
                        Chơi lại
                    </button>
                </div>
                <Board
                    squares={squares}
                    playerX={this.state.playerX}
                    onClick={i => this.handleClick(i)}
                />
                <div className="sidebar">
                    <p>X - O</p>
                    <p>
                        {this.player1Score} - {this.player2Score}
                    </p>
                    {moves}
                </div>
            </Fragment>
        );
    }
}

function calculateWinner(squares) {
    let lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c] &&
            squares[a] === squares[d] &&
            squares[a] === squares[e]
        ) {
            return squares[a];
        }
    }
    return null;
}
function checkDraw(squares) {
    for (let i = 0; i < 25; i++) {
        if (squares[i] === null) {
            return null;
        }
    }
    return true;
}

ReactDOM.render(<Game />, document.getElementById("root"));
