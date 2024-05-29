const Gameboard = (function (){
    const board = [];
    const rows = 3; 
    const columns = 3;

    //Cells factory function
    const createCell = () => {
        let mark = "";
        const addMark = (playerMark) => {
            mark = playerMark;
        };
        const getMark = () => mark;

        return {
            addMark,
            getMark
        };
    };

    const newBoard = () => {
    // For loop to insert a Cell object in each cell/square
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
            board[i].push(createCell());
            };
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

    newBoard();

    return {
        getBoard,
        mark,
        logBoard,
        newBoard
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

    // board is an array of objects
    board = Gameboard.getBoard();


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

        const Winner = checkWinner();
        const Tie = checkTie();

        if(Winner) {
            switchActivePlayer();
            console.log(`Congrats! ${getActivePlayer().name}.`,'\n',"Resetting Board...");
            Gameboard.newBoard();
        }
        else if(Tie) {
            console.log("IT'S A TIE!")
        };
    };

    const checkTie = () => {
        //checks for ties
        // boardWithCellValues is an array of "marks" either x or o
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));

        if(boardWithCellValues.every(row => row.every(cell => cell !== ""))){
            return true
        }; 
    };

    const checkWinner = () => {
        //check for a winner every round
        let gameOver = false;

        // boardWithCellValues is an array of "marks" either x or o
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));

        // checking every row
        const checkHorizontal = () => {
            for (let i = 0; i < board.length; i++) {
                // checks if all elements in a row are equal
                if(boardWithCellValues[i].every(mark => mark === boardWithCellValues[i][0])) {
                    // makes sure doesn't inclued empty strings
                    if(!boardWithCellValues[i].includes("")) {
                        return true;
                    };
                };
            };
        };

        // checking every column
        const checkVerticle = () => {
            for (let i = 0; i < board.length; i++) {
                //grab a column using map()
                const col = boardWithCellValues.map(row => row[i]);
                // check if all values in col are equal
                if(col.every(mark => mark === boardWithCellValues[i][0]))
                    // makes sure doesn't inclued empty strings
                    if(!col.includes("")) {
                        return true;
                    };
            };
        };

        const checkDiagonal = () => {
            // functions that get the diagonal values in an array
            const getDiagonal_1 = array => array.map((row, index) => row[index]);
            const getDiagonal_2 = array => array.map((row, index) => row[row.length-index-1]);

            // storing diagonal values
            const diagonalCells_1 = getDiagonal_1(boardWithCellValues);
            const diagonalCells_2 = getDiagonal_2(boardWithCellValues);

            // if array doesn't inclued empty strings because that's the default value then check if all values match then change gameOver to true
            if( !diagonalCells_1.includes("")){
                if(diagonalCells_1.every(mark => mark === diagonalCells_1[0])) {
                    return true;
                };
            };
            if( !diagonalCells_2.includes("")){
                if(diagonalCells_2.every(mark => mark === diagonalCells_2[0])) {
                    return true;
                };
            };
        };

        if(gameOver = checkVerticle()) {
            return gameOver;
        }
        if(gameOver = checkHorizontal()) {
            return gameOver;
        }
        if(gameOver = checkDiagonal()) {
            return gameOver;
        };
    };

    const getResetGame = () => resetGame;

    // logs the curren player's name to the console
    const logRound = () => {
        Gameboard.logBoard();
        console.log(`${getActivePlayer().name}'s turn to play. Your mark is ${getActivePlayer().mark}`);
    };

    logRound();

    return {
        playRound,
        getActivePlayer,
        getResetGame
    };
};