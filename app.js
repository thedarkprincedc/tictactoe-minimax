var player = "x";
var opponenet = "o";
function isMovesLeft(board){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j]=='_'){
                return true;
            }
        }
    }
    return false;
}
function evaluate(board) {
    // Checking for Rows for X or O victory.
    for (var row = 0; row < 3; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            if (board[row][0] == player)
                return +10;
            else if (board[row][0] == opponenet)
                return -10;
        }
    }
    // Checking for Columns for X or O victory. 
    for (var col = 0; col < 3; col++) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
            if (board[0][col] == player)
                return +10;
            else if (board[0][col] == opponenet)
                return -10;
        }
    }
    // Checking for Diagonals for X or O victory. 
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if (board[0][0] == player)
            return +10;
        else if (board[0][0] == opponent)
            return -10;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        if (board[0][2] == player)
            return +10;
        else if (board[0][2] == opponent)
            return -10;
    }
    // Else if none of them have won then return 0 
    return 0;
}

function minimax(board, depth, isMax) {
    var score = evaluate(board);
    if(score == 10)
        return score;
    if(score == -10)
        return score;
    if(isMovesLeft(board)==false){
        return 0;
    }
    if(isMax){
        var best = -1000;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(board[i][j]=='_'){
                    board[i][j]=player;
                    best = Math.max(best, minimax(board, depth+1, !isMax));
                    board[i][j] = '_';
                }
            }
        }
        return best;
    } else {
        var best = 1000;
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(board[i][j]=='_'){
                    board[i][j]=opponenet;
                    best = Math.min(best, minimax(board,depth+1, !isMax))
                    board[i][j]="_";
                }
            }
        }
        return best;
    }
}

function findBestMove(board) {
    var bestVal = -1000;
    var bestMove = {
        row: -1,
        col: -1
    };
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == '_') {
                board[i][j] = player;
                //
                var moveVal = minimax(board, 0, false)
                //
                board[i][j] = "_";
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    console.log("The value of the best Move is : %d\n\n", 
            bestVal); 
  
    return bestMove;
}

(function () {
    var board = [
        ['x', 'o', 'x'],
        ['o', 'o', 'x'],
        ['_', '_', '_']
    ];
    console.log(board)
    var bestMove = findBestMove(board);
    console.log("The Optimal Move is :\nROW %d COL: %d\n\n",  
        bestMove.row, bestMove.col);

})();