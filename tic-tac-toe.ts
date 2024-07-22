interface Scoring {
    [key: string]: number;
    X: number, 
    O: number, 
    ' ': number
}
const scoring: Scoring = {
    X: 1, 
    O: -1, 
    ' ': 0
}

function checkWinner(arr: string[][]) {
    function getScore(row: number, col:number) {
        return scoring[arr[row][col]];
    }
    //Check rows, columns, diagonals
    let main_diag: number = 0;
    let anti_diag: number = 0;
    for(let row: number = 0; row < arr.length; row++) {
        let hor_counter: number = 0
        let ver_counter: number = 0
        main_diag += scoring[arr[row][row]]
        anti_diag += scoring[arr[row][arr.length - row - 1]]
        for(let col: number = 0; col < arr.length; col++) {
            hor_counter += scoring[arr[row][col]]
            ver_counter += scoring[arr[col][row]]
            if(Math.abs(hor_counter) == arr.length || Math.abs(ver_counter) == arr.length) {
                return hor_counter == 1 * arr.length || ver_counter == 1 * arr.length ? 'X': 'O' ;
            }
        }
    }
    if(Math.abs(main_diag) == arr.length || Math.abs(anti_diag) == arr.length) {
        return main_diag == 1 * arr.length || anti_diag == 1 * arr.length ? 'X': 'O' ;
    } 

    //Check corners: 
    let cornerSum:number = getScore(0,0) + getScore(arr.length - 1, 0) + getScore(0, arr.length - 1) + getScore(arr.length - 1,arr.length - 1)
    if(Math.abs(cornerSum) == 4) {
        return cornerSum == 4 ? 'X': 'O';
    }

    //Check 2x2
    for(let row = 0; row < arr.length - 1; row++) {
        for(let col = 0; col < arr.length - 1; col++) {
            let counter: number = getScore(row, col) + getScore(row+1, col) + getScore(row, col+1) + getScore(row+1, col+1);
            if(Math.abs(counter) == arr.length) {
                return counter == arr.length ? 'X': 'O';
            }
        }
    }
    return " ";
}

function anyMovesLeft(arr: string[][]) {
    for(let row: number = 0; row < arr.length; row++) {
        for(let col:number = 0; col < arr[row].length; col++) {
            if(arr[row][col] === ' ') {
                return true;
            }
        }
    }
    return false;
}
function isGameOver(arr: string[][]) {
    if(checkWinner(arr) == 'X' || checkWinner(arr) == 'O' || !anyMovesLeft(arr)) {
        return true;
    }
    return false;
}
