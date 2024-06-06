
function $(data, all) {
    if (all === undefined) {
        return document.querySelector(data);

    } else if (all === 'all') {
       // console.log(2);
        return document.querySelectorAll(data); 
    } 

    else {
        console.log("error");
    }
}


function generateSudokuBoard() {
    const size = 9;
    const emptyMin = 4;
    const emptyMax = 6;
    let board = Array.from({ length: size }, () => Array(size).fill(null));

    // Helper function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to check if a number can be placed at board[row][col]
    function isValid(board, row, col, num) {
        for (let i = 0; i < size; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Function to fill the board with numbers
    function fillBoard(board) {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                let numbers = shuffle([...Array(size).keys()].map(x => x + 1));
                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        break;
                    }
                }
            }
        }
    }

    // Function to add nulls randomly to the board
    function addNulls(board) {
        for (let row = 0; row < size; row++) {
            let nullCount = Math.floor(Math.random() * (emptyMax - emptyMin + 1)) + emptyMin;
            let indices = shuffle([...Array(size).keys()]);
            for (let i = 0; i < nullCount; i++) {
                board[row][indices[i]] = null;
            }
        }
    }

    // Fill the board with numbers
    fillBoard(board);
    
    // Add nulls to the board
    addNulls(board);

    return board;
}

function add_board(){
    let table_list = []    
    for(let i=0;i<9;i++){
        for(let b=0;b<9;b++){
            table_list.push(sudokuBoard[i][b])
        }
    }
        $('.sudoku-table td', 'all').forEach((td,index) => {
                $("#"+td.id).textContent = table_list[index]
              if(table_list[index] != null){
                $("#"+td.id).classList.add("nonclick")
              }
        });
   

}
function checkline(){
    let testnum = 0
    $('.sudoku-table td', 'all').forEach((td,index)=> {
        let number1 = Number(td.textContent)
       testnum += number1
       if(testnum == 405){
        alert("o")
       }

       else{
        console.log("xxxxxxxxxx")
        validateAllRows()
       }
     

    });
    console.log(testnum)
}
function number_insert(){
    let insert_num = ""
$('.num_box li','all').forEach(pad =>{
    pad.onclick = (e)=>{
     //   console.log(e.target.innerText)
        insert_num = e.target.innerText
    };
})
$(".eraser").onclick = ()=>{
    insert_num = null
}

$('.sudoku-table td', 'all').forEach(td => {
    td.onclick = (e) => {
       // console.log(insert_num)
        e.target.textContent = insert_num
        checkline()
        
    };
});

}

//한줄마다 맞는지 확인하는방법
function validateAllRows() {
    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // 2차원 배열 생성
    const data = [];
    for (const row of rows) {
      const rowData = [];
      for (const col of cols) {
        const cellId = row + col;
        const cellValue = document.getElementById(cellId).textContent;
        rowData.push(cellValue);
      }
  
      data.push(rowData);

    }
    
 
    let testline1 = 0;
    for(let i = 0; i<9;i++){
        let sum1 = data[i].reduce((a,b)=>Number(a)+Number(b));

        if (sum1 == 45){
            testline1 += 1
            console.log(sum1,"a")
            console.log(testline1,"완성된줄")
        }
    }
}


let sudokuBoard = generateSudokuBoard();
add_board()
number_insert()
