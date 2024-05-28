const Gameboard = (function (){
    const board = [];
    const rows = 3; 
    const columns = 3;

    //Cells factory function
    const createCell = () => {
        let mark = "";
        const addMark = (playerMark) => {
            mark = playerMark;
        }
        const getMark = () => mark;

        return {
            addMark,
            getMark
        };
    };

    // For loop to insert a Cell object in each cell/square
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(createCell());
        }
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
const Player = (function() {

    const addNames = (player1, player2) => {
        playersArray[0].name = player1;
        playersArray[1].name = player2;
    }
    const playersArray = [
        {
            name: "",
            mark: "X"
        },
        {
            name: "",
            mark: "O"
        }
    ];

    const getPlayers = () => playersArray;

    return {getPlayers, addNames};
})();


const GameFlow = () => {
    let players = Player.getPlayers();
    let activePlayer = players[0];

    // switches the active player when called
    const switchActivePlayer= () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // returns the current active player
    const getActivePlayer = () => activePlayer;

    // controls each round
    const playRound = (column, row) => {
        Gameboard.mark(column, row, getActivePlayer().mark);

        switchActivePlayer();
        logRound();
    };

    // logs the curren player's name to the console
    const logRound = () => {
        Gameboard.logBoard();
        console.log(`${getActivePlayer().name}'s turn to play.`);
    }

    logRound();

    return {
        playRound,
        getActivePlayer
    };
}