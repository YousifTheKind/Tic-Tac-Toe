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

    newBoard();

    return {
        getBoard,
        mark,
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

const GameFlowController = () => {
    let players = Player.getPlayers();
    let activePlayer = players[0];

    // board is an array of objects
    board = Gameboard.getBoard();

    // a function that returns the latest board to be used in displayController
    const getBoard = () => board;

    // switches the active player when called
    const switchActivePlayer= () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // returns the current active player
    const getActivePlayer = () => activePlayer;

    // controls each round
    const playRound = (column, row) => {
        // check if other player already choose this cell
        if(board[row][column].getMark() !== ""){
            return;
        };

        Gameboard.mark(column, row, getActivePlayer().mark);
        switchActivePlayer();

        const Winner = checkWinner();
        const Tie = checkTie();

        if(Winner) {
            switchActivePlayer();
            displayController.winMessage();
            Gameboard.newBoard();
        }
        else if(Tie) {
            displayController.tieMessage();
            Gameboard.newBoard();
        };
    };

    const checkTie = () => {
        // boardWithCellMarks is an array of "marks" either x or o
        const boardWithCellMarks = board.map((row) => row.map((cell) => cell.getMark()));

        if(boardWithCellMarks.every(row => row.every(cell => cell !== ""))){
            return true
        }; 
    };

    const checkWinner = () => {
        //check for a winner every round
        let gameOver = false;

        // boardWithCellMarks is an array of "marks" either x or o
        const boardWithCellMarks = board.map((row) => row.map((cell) => cell.getMark()));

        // checking every row
        const checkHorizontal = () => {
            for (let i = 0; i < board.length; i++) {
                // checks if all elements in a row are equal
                if(boardWithCellMarks[i].every(mark => mark === boardWithCellMarks[i][0])) {
                    // makes sure doesn't inclued empty strings
                    if(!boardWithCellMarks[i].includes("")) {
                        return true;
                    };
                };
            };
        };

        // checking every column
        const checkVerticle = () => {
            for (let i = 0; i < board.length; i++) {
                //grab a column using map()
                const col = boardWithCellMarks.map(row => row[i]);
                // check if all Marks in col are equal & makes sure doesn't inclued empty strings
                if(col.every(mark => mark === col[0] && !col.includes(""))){
                        return true;
                };
            };
        };

        const checkDiagonal = () => {
            // functions that get the diagonal Marks in an array
            const getDiagonal_1 = array => array.map((row, index) => row[index]);
            const getDiagonal_2 = array => array.map((row, index) => row[row.length-index-1]);

            // storing diagonal Marks
            const diagonalCells_1 = getDiagonal_1(boardWithCellMarks);
            const diagonalCells_2 = getDiagonal_2(boardWithCellMarks);

            // if array doesn't inclued empty strings because that's the default value then check if all Marks match then change gameOver to true
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
        };
        if(gameOver = checkHorizontal()) {
            return gameOver;
        };
        if(gameOver = checkDiagonal()) {
            return gameOver;
        };
    };

    return {
        playRound,
        getActivePlayer,
        getBoard
    };
};

const displayController = (function () {
    const game = GameFlowController();
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const startBtn = document.querySelector(".startBtn");
    const restartBtn = document.querySelector(".restartBtn");
    const form = document.querySelector("form");
    const hideBoard = document.getElementById("hideBoard");
    hideBoard.style.display="none";
    const errorMessage = document.getElementById("message");
    const resultDiv = document.getElementById("winMessage");
    resultDiv.style.display="none";

    let gameStarted = false;

    const updateDisplay = () => {
        //clear display
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        turnDiv.textContent = `${activePlayer.name}'s turn to play. Your mark is ${activePlayer.mark}`;

        // render board array
        board.forEach((row,index) => {
            let rowIndex = index;
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.column = index;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell.getMark();
                boardDiv.appendChild(cellButton);
            });
          });
    };

    const boardClickListener = (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        // make sure player didn't click on the gaps
        if(!selectedColumn || !selectedRow) return;

        game.playRound(selectedColumn, selectedRow);
        updateDisplay();
    };

    boardDiv.addEventListener("click", boardClickListener)

   //initial render
   updateDisplay();

   const startBtnClickListener = (e) => {
    e.preventDefault();

    const playerOne = document.getElementById("playerOneName").value;
    const playerTwo = document.getElementById("playerTwoName").value;

    if(!playerOne || !playerTwo) {
        errorMessage.textContent = "Please Enter Both Names"
        return;
    };

    errorMessage.textContent = ""
    Player.addNames(playerOne, playerTwo);
    hideBoard.style.display="inherit"
    updateDisplay();
    form.reset();
    gameStarted = true;
   };

   const restartBtnClickListener = (e) => {
    e.preventDefault();
    if(!gameStarted) {
        errorMessage.textContent = "Please Enter Both Names Then Click Start"
        return;
    };
    Gameboard.newBoard();
    hideBoard.style.display = "inherit";
    resultDiv.style.display="none"
   };

   startBtn.addEventListener("click", startBtnClickListener);
   restartBtn.addEventListener("click", restartBtnClickListener);

   const winMessage = () => {
    const activePlayer = game.getActivePlayer();
    resultDiv.style.display="block"
    resultDiv.textContent = `${activePlayer.name} Won! Click Restart To Play Again.`
    hideBoard.style.display = "none";
   };

   const tieMessage = () => {
    resultDiv.style.display="block"
    resultDiv.textContent = `DRAW \nClick Restart To Play Again!`
    hideBoard.style.display = "none";
   };

   return {winMessage, tieMessage}
})();