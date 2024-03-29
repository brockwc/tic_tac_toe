//  Create board
var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

// Create variable to store winning player
var winningPlayer = 0;

//  Keeping track of whose turn it is
var turn = {
  number: 0,
  current_player_color : function() {
    if (this.number % 2 === 0) {
      return 1;
    }
    else {
      return 2;
    }
  },
  change_turn : function() {
    this.number += 1;
  }
};

// Check to see if any of the rows have three in a row
function check_rows() {
  for (i = 0; i < board.length; i++) {
    var same = true;
    for (j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0 || board[i][j] !== board[i][0]) {
        same = false;
      }
    }
    if (same) {
      return same;
    }
  }
}

// Check to see if any columns have three in a row
function check_cols() {
  for (i = 0; i < board.length; i++) {
    var same = true;
    for (j = 0; j < board[i].length; j++) {
      if (board[j][i] === 0 || board[j][i] !== board[0][i]) {
        same = false;
      }
    }
    if (same) {
      return same;
    }
  }
}

// Check to see if diagonals have three in a row
function check_diag() {
  var same = true;
  
  for (i = 0; i < board.length; i++) {
    if (board[i][i] === 0 || board[i][i] !== board[0][0]) {
      same = false;
    }
  }

  if (same) {
    return same;
  }
  same = true;

  for (i = 0; i < board.length; i++) {
    if (board[i][2 - i] === 0 || board[i][2 - 1] !== board[0][2]) {
      same = false;
    }
  }

  if (same) {
    return same
  }
}

// Check for cat's game
function check_tie() {
  var flattened_board = Array.prototype.concat.apply([], board);
  for (i = 0; i < flattened_board.length; i++) {
    if(flattened_board[i] === 0) {
      console.log(i);
      return false;
    }
  }
  return true;
}

// Check for a winner
function check_winner() {
  if (check_rows() === true || check_cols() === true || check_diag === true) {
    winningPlayer = turn.current_player_color();
    // alert winner
    end_game("Player " + winningPlayer + ", you win!");
  }
  else if (check_tie() === true) {
    end_game("Cat's game!");
  }
  else {
    turn.change_turn();
  }
}

// End the game, alert the winner and refresh the page
function end_game(message) {
  alert(message);
  location.reload();
}

// Check the value of a cell
function check_cell(cell) {
  var row = $(cell).data("row");
  var col = $(cell).data("col");
  return(board[row][col]);
}

function change_cell(cell) {
  // Change cell to player color
  var row = $(cell).data("row");
  var col = $(cell).data("col");
  board[row][col] = turn.current_player_color();
  if (turn.current_player_color() == 1){
    // remove hover class immediately once clicked
    $('.box_cell').click(function() {
      $(this).removeClass('hover');
    });
    $(cell).addClass('red');    
  }
  else {
    $(cell).addClass('blue');
  }
}

$(document).ready(function() {
  // Fix to make hover work right
  $('.box_cell').hover(function() {
    $(this).addClass('hover');    
  }, function() {
    $(this).removeClass('hover');
  });

  // Take appropriate action when box is clicked
  $('.box_cell').click(function() {
    // Check if cell is 0 on the board
    if (check_cell(this) === 0 && winningPlayer === 0) {
      // CHange color if 0
      change_cell(this);
      // CHeck for winner
      check_winner();
    }
  });
});





































