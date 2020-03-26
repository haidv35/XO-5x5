import React, {Fragment} from "react";
import Square from "./Square.js";

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                onClick={() => this.props.onClick(i)}
                value={this.props.squares[i]}
            />
        );
    }
    setupBoard() {
        const rowQty = 5;
        const colQty = 5;
        const board = [];
        let j,
            col = 0;
        for (let i = 0; i < rowQty; i++) {
            let children = [];
            for (j = col; j < colQty + col; j++) {
                children.push(this.renderSquare(j));
            }
            col = j;
            board.push(<div className="board-row">{children}</div>);
        }
        return board;
    }
    render() {
        const board = this.setupBoard();
        return (
            <Fragment>
                <div className="main">
                    {board.map(item => {
                        return item;
                    })}
                </div>
            </Fragment>
        );
    }
}

export default Board;
