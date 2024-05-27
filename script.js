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

    const logBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        mark,
        logBoard
    };
    
})()