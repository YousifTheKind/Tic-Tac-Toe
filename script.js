const Gameboard = (function (){
    const board = [];
    const rows = 3; 
    const columns = 3;

    // For loop to insert a Cell object in each cell/square
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(createCell());
        }
      };

    //Cells factory function
    const createCell = () => {
        mark = "";
        const addMark = (playerMark) => {
            mark = playerMark;
        }
        const getMark = () => mark;

        return {
            addMark,
            getMark
        };
    };
    
    // Marks the cell with X or O
    const mark = (column, row, playerMark) => {
        board[row][column].addMark(playerMark);
    };

    // a method that returns the board to make it a private variable 
    const getBoard = () => board;

    // log board's values
    const logBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        mark,
        logBoard
    };

})();

// Creates two players objects
const Player = (firstPlayerName, secondPlayerName) => {
    const players = [
        {
            name: firstPlayerName,
            mark: "X"
        },
        {
            name: secondPlayerName,
            mark: "O"
        }
    ];

    return players;
};


const GameFlow = () => {
    const players = Player();
    let activePlayer = players[0];

    // switches the active player when called
    const switchActivePlayer= () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // returns the current active player
    const getActivePlayer = () => activePlayer;

    // controls each round
    const playRound = (column, row) => {
        activePlayerMark = getActivePlayer.mark;

        Gameboard.mark(column, row, activePlayerMark);

        switchActivePlayer();
        logRound();
    };

    const logRound = () => {
        Gameboard.logBoard();
        console.log(`${getActivePlayer.name}'s turn to play.`)
    }

    logRound();

    return {
        playRound,
        getActivePlayer
    };
}