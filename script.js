let paper = Raphael(0, 0, innerWidth, innerHeight)
//var for empty
let empty = 0
let full = 1
//initialize board
let currentlyPlaying = true
let board = new Array(20)
let currentRow = board.length - 1
let currentBlockSize = 3
let currentRightCell
let currentMiddleCell
let currentLeftCell
let blockSizeBefore
let leftOffset = 0
let rightOffset = 0
let up
let down
let left
let right
let loop
let goingLeft = false
let goingRight = true
let deadarr = []
//fill board with arrays to make it 2d
for (let row = 0; row < board.length; row++) {
  board[row] = new Array(7)
  for (let col = 0; col < board[row].length; col++) {
    board[row][col] = empty
  }
}
const moveBlock = () => {
  render()
  if (currentBlockSize == 0) {
    currentlyPlaying = false
  }
  if (currentlyPlaying) {
    render()
    currentRightCell = board[currentRow][leftOffset + currentBlockSize]
    currentLeftCell = board[currentRow][leftOffset - 1]
    if (typeof (currentRightCell) == "undefined") {
      goingLeft = true
      goingRight = false
    } else if (currentRightCell == empty && goingRight == true) {
      // console.log("empty on right")
      for (let block = 0; block < currentBlockSize + 1; block++) {
        // board[currentRow][leftOffset + block] = full
        setb(currentRow, leftOffset + block, full)
      }
      setb(currentRow, leftOffset, empty)
      // board[currentRow][leftOffset] = empty
      leftOffset++

    }
    if (currentLeftCell == empty && goingLeft == true) {
      // console.log("empty on left")
      setb(currentRow, leftOffset + currentBlockSize - 1, empty)
      setb(currentRow, leftOffset - 1, full)
      // board[currentRow][leftOffset + currentBlockSize - 1] = empty
      // board[currentRow][leftOffset - 1] = full
      leftOffset--
      if (leftOffset == 0) {
        goingRight = true
        goingLeft = false
      }
    }
  }
}
const render = () => {
  paper.clear()
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 7; col++) {
      try { up = board[row - 1][col] } catch (e) { up = empty }
      try { down = board[row + 1][col] } catch (e) { down = empty }
      try { left = board[row][col - 1] } catch (e) { left = empty }
      try { right = board[row][col + 1] } catch (e) { right = empty }
      if(up && down && left && right == empty){
        board[row][col] == empty
      }
      let sqr = paper.rect(innerWidth / 2 + col * 40, 50 + row * 40, 35, 35)
      if (board[row][col] == full) {
        sqr.attr({ fill: "black" })
      }
    }
  }
}
const start = () => {
  render()
  loop = setInterval(moveBlock, 150)
}
const setb = (row, col, val) => {
  //!typeof
  if (typeof (board[row][col]) != "undefined") {
    board[row][col] = val
  }
}
//function for pressing space

onkeydown = (e) => {
  if (currentlyPlaying) {
    if (e.key.toLowerCase() == " ") {
      if (currentRow >= 0) {
        if (currentRow < 19) {
          blockSizeBefore = currentBlockSize
          console.log("most left cell " + board[currentRow][leftOffset] + " should be 1")
          if (board[currentRow + 1][leftOffset] == empty) {
            setb(currentRow, leftOffset, empty)
            deadarr.push([currentRow, leftOffset])
            // board[currentRow][leftOffset] = empty
            if (currentBlockSize < 1) {
              currentBlockSize = 0
              currentlyPlaying = false
            } else {
              currentBlockSize--
            }
          }
          console.log("most right cell " + board[currentRow][leftOffset + currentBlockSize - 1] + " should be 1")
          if (board[currentRow + 1][leftOffset + currentBlockSize - 1] == empty) {
            setb(currentRow, leftOffset + currentBlockSize - 1, empty)
            deadarr.push([currentRow, leftOffset + currentBlockSize - 1])
            // board[currentRow][leftOffset + currentBlockSize] = empty
            if (blockSizeBefore == 3) {
              console.log(board[currentRow][leftOffset + 2])
              setb(currentRow, leftOffset + 2, empty)
              deadarr.push([currentRow, leftOffset + 2])
              currentBlockSize--
            }
            if (currentBlockSize < 1) {
              currentBlockSize = 0
            } else {
              currentBlockSize--
            }
          }
        }
        currentRow -= 1;
        if (currentRow == -1) {
          console.log("you won")
          clearInterval(x)
        }
        console.log(board)
        document.getElementById("test").innerText = currentRow
      }
    }
  }
}