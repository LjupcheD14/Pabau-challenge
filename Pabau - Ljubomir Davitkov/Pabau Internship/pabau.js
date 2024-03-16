// This is straight forward solution without more functions

// window.onload = function (){
//     const matrix = [
//         ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
//         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//         ['+', '-', 'U', '-', '+', ' ', ' ', ' ', 'C'],
//         ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
//         ['s', ' ', ' ', ' ', 'C', '-', '-', '-', '+'],
//     ];
//     let maxi = matrix.length;
//     let maxj = matrix[0].length;
//     function findPath(matrix){
//         let i;
//         let j;
//         let dir;
//         for (let row = 0; row < matrix.length; row++) {
//             for (let col = 0; col < matrix[row].length; col++) {
//                 if(matrix[row][col] === ">"){
//                     i = row;
//                     j = col;
//                     dir = "R";
//                 }else if(matrix[row][col] === "<"){
//                     i = row;
//                     j = col;
//                     dir = "L";
//                 }
//             }
//         }
//         let path = "";
//         let letters = "";
//         while (true){
//             path+=matrix[i][j];
//             if(matrix[i][j] === "s") break;
//             if(/^[A-Z]$/.test(matrix[i][j])) letters+=matrix[i][j]
//             let flag = true;
//             if(matrix[i][j] === "+" || /^[A-Z]$/.test(matrix[i][j])){
//                 if(j-1>=0 && flag){
//                     if(matrix[i][j-1] !== ' '){
//                         if(dir !== 'R' && dir!=="L"){
//                             flag = false
//                             dir = "L"
//                         }
//                     }
//                 }
//                 if(j+1<maxj && flag){
//                     if(matrix[i][j+1] !== ' '){
//                         if(dir!=="L" && dir!=="R") {
//                             dir = "R"
//                             flag = false;
//                         }
//                     }
//                 }
//                 if(i-1>=0 && flag){
//                     if(matrix[i-1][j]!==' '){
//                         if(dir !== "D" && dir!=="U") {
//                             dir = "U";
//                             flag = false
//                         }
//                     }
//                 }
//                 if(i+1<maxi && flag){
//                     if(matrix[i+1][j] !== ' '){
//                         if(dir!=="D" && dir!=="U") {
//                             dir = "D";
//                             flag = false
//                         }
//                     }
//                 }
//             }
//             if(dir === "R"){
//                 j++;
//             }else if(dir=== "L"){
//                 j--;
//             }else if(dir === "U"){
//                 i--;
//             }else if (dir === "D"){
//                 i++;
//             }
//         }
//         document.write(path)
//         document.write(letters)
//
//         console.log(path)
//         console.log(letters)
//
//     }
//     findPath(matrix);
// }


// This is solution with more functions and separated logic

window.onload = function () {
    const matrix = [
        ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
        ['+', '-', 'U', '-', '+', ' ', ' ', ' ', 'C'],
        ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
        ['s', ' ', ' ', ' ', 'C', '-', '-', '-', '+'],
    ];

    const matrix1 = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['+', '-', 'U', '-', '+', ' ', ' ', ' ', ' '],
        ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' '],
        ['s', ' ', ' ', ' ', 'C', '-', 'A', '-', '<'],
    ];

    // findStart() function is created to find the starting position in the matrix.
    function findStart(matrix) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === ">") {
                    return { i: row, j: col, dir: "R" };
                } else if (matrix[row][col] === "<") {
                    return { i: row, j: col, dir: "L" };
                }
            }
        }
    }


    // updateDirection() function is created to update the direction of traversal.
    function updateDirection(dir, i, j, matrix) {
        if (dir === "R") {
            j++;
        } else if (dir === "L") {
            j--;
        } else if (dir === "U") {
            i--;
        } else if (dir === "D") {
            i++;
        }
        return { i, j };
    }

    // traverse() function is created to traverse the matrix and collect the path and letters.
    function traverse(matrix, start) {
        let { i, j, dir } = start;
        let path = "";
        let letters = "";

        while (true) {
            path += matrix[i][j];
            if (matrix[i][j] === "s") break;
            if (/^[A-Z]$/.test(matrix[i][j]))
                letters += matrix[i][j];

            let flag = true;

            if (matrix[i][j] === "+" || /^[A-Z]$/.test(matrix[i][j])) {
                if (j - 1 >= 0 && flag) {
                    if (matrix[i][j - 1] !== ' ') {
                        if (dir !== 'R' && dir !== "L") {
                            flag = false;
                            dir = "L";
                        }
                    }
                }
                if (j + 1 < matrix[0].length && flag) {
                    if (matrix[i][j + 1] !== ' ') {
                        if (dir !== "L" && dir !== "R") {
                            dir = "R";
                            flag = false;
                        }
                    }
                }
                if (i - 1 >= 0 && flag) {
                    if (matrix[i - 1][j] !== ' ') {
                        if (dir !== "D" && dir !== "U") {
                            dir = "U";
                            flag = false;
                        }
                    }
                }
                if (i + 1 < matrix.length && flag) {
                    if (matrix[i + 1][j] !== ' ') {
                        if (dir !== "D" && dir !== "U") {
                            dir = "D";
                            flag = false;
                        }
                    }
                }
            }

            ({ i, j } = updateDirection(dir, i, j, matrix));
        }

        return { path, letters };
    }

    // printResults() function is created to print the results obtained from traversal.
    function printResults(results) {
        const { path, letters } = results;

        document.write("Path: " + path);
        document.write("Letters: " + letters);

        console.log("Path: " + path);
        console.log("Letters: " + letters);
    }

    const start = findStart(matrix);
    const results = traverse(matrix, start);
    printResults(results);
}


