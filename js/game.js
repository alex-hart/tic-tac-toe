//Hide indicators showing who's turn it is
$(".turnIndicators").hide();

//Hide all naughts and crosses symbols
$(".symbol").hide();

//Hide main menu screens
$(".selectionScreen").hide();

//Document ready check
$(function() {
  //Array of the tic tac toe board
  //0: empty
  //1: cross
  //2: naught
  var arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  //Randomly decide who goes first
  var turn;
  var randomNo = Math.round(Math.random());
  if (randomNo === 0) {
    turn = "cross";
  } else {
    turn = "naught";
  }

  //Variables to track game type and who's turn it is
  var gameMode;
  var playerOne;
  var playerTwo;

  var $tableCells = $("td");

  //Function to generate random number between min and max val, used for when computer has to make a random move if their its is first
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Function to check if a blank space remains on the board
  function checkBlank() {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  }

  //Function to generate the correct game over message
  function gameOverMsg() {
    if (gameMode == "twoP") {
      if (turn == playerOne) {
        $('#winMessage').text("Player 1 won!");
      } else {
        $('#winMessage').text("Player 2 won!");
      }
    } else if (gameMode == "oneP") {
      if (turn == playerOne) {
        $('#winMessage').text("You won!");
      } else {
        $('#winMessage').text("You lost!");
      }
    }
  }

  function insertSymbol(row, column) {
    $tableCells.each(function() {
      if ($(this).attr("row") == row &&
          $(this).attr("position") == column) {
        $(this).find("." + playerTwo).delay(1000).fadeIn(500);
      }
    });
  }

  // ----- COMPUTER AI -----

  //Function to end the game if the computer can make such a move. It essentially looks for every possible combination where two naughts or crosses are lined up with the third space blank as well. This is checked by using the array as a model of the current board state
  function endGame() {
    for (var i = 0; i < arr.length; i++) {
      // ----- ROWS -----
      if (arr[i][0] == playerTwo &&
          arr[i][0] == arr[i][1] &&
          arr[i][2] === 0 &&
          turn == playerTwo) {
        insertSymbol(i, 2);
        arr[i][2] = playerTwo;
        return true;
      } else if (arr[i][1] == playerTwo &&
                 arr[i][1] == arr[i][2] &&
                 arr[i][0] === 0 &&
                 turn == playerTwo) {
        insertSymbol(i, 0);
        arr[i][0] = playerTwo;
        return true;
      } else if (arr[i][0] == playerTwo &&
                 arr[i][0] == arr[i][2] &&
                 arr[i][1] === 0 &&
                 turn == playerTwo) {
        insertSymbol(i, 1);
        arr[i][1] = playerTwo;
        return true;

        //----- COLUMNS -----
      } else if (arr[0][i] == playerTwo &&
                 arr[0][i] == arr[1][i] &&
                 arr[2][i] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, i);
        arr[2][i] = playerTwo;
        return true;
      } else if (arr[0][i] == playerTwo &&
                arr[0][i] == arr[2][i] &&
                arr[1][i] === 0 &&
                turn == playerTwo) {
        insertSymbol(1, i);
        arr[1][i] = playerTwo;
        return true;
      } else if (arr[1][i] == playerTwo &&
                 arr[1][i] == arr[2][i] &&
                 arr[0][i] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0, i);
        arr[0][i] = playerTwo;

      //----- DIAGONAL -----
      } else if (arr[0][0] == playerTwo &&
                 arr[0][0] == arr[1][1] &&
                 arr[2][2] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, 2);
        arr[2][2] = playerTwo;
        return true;
      } else if (arr[1][1] == playerTwo &&
                 arr[1][1] == arr[2][2] &&
                 arr[0][0] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0, 0);
        arr[0][0] = playerTwo;
        return true;
      } else if (arr[0][0] == playerTwo &&
                 arr[0][0] == arr[2][2] &&
                 arr[1][1] === 0 &&
                 turn == playerTwo) {
        insertSymbol(1, 1);
        arr[1][1] = playerTwo;
        return true;
      } else if (arr[0][2] == playerTwo &&
                 arr[0][2] == arr[1][1] &&
                 arr[2][0] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, 0);
        arr[2][0] = playerTwo;
        return true;
      } else if (arr[0][2] == playerTwo &&
                 arr[0][2] == arr[2][0] &&
                 arr[1][1] === 0 &&
                 turn == playerTwo) {
        insertSymbol(1 ,1);
        arr[1][1] = playerTwo;
        return true;
      } else if (arr[1][1] == playerTwo &&
                 arr[1][1] == arr[2][0] &&
                 arr[0][2] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0 , 2);
        arr[0][2] = playerTwo;
        return true;
      }
    }
    return false;
  }

  //This function is for the computer to block the human player from winning. It is essentially the same as the above function but checks for the player's symbols rather than its own.
  function blockWin() {
    for (var i = 0; i < arr.length; i++) {
      if (turn == playerTwo) {
          //----- ROWS -----
        if (arr[i][0] == playerOne &&
            arr[i][0] == arr[i][1] &&
            arr[i][2] === 0) {
          insertSymbol(i, 2);
          arr[i][2] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[i][1] == playerOne &&
                   arr[i][1] == arr[i][2] &&
                   arr[i][0] === 0) {
          insertSymbol(i, 0);
          arr[i][0] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[i][0] == playerOne &&
                   arr[i][0] == arr[i][2] &&
                   arr[i][1] === 0) {
          insertSymbol(i, 1);
          arr[i][1] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;

          //----- COLUMNS -----
        } else if (arr[0][i] == playerOne &&
                   arr[0][i] == arr[1][i] &&
                   arr[2][i] === 0) {
          insertSymbol(2, i);
          arr[2][i] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[0][i] == playerOne &&
                   arr[0][i] == arr[2][i] &&
                   arr[1][i] === 0) {
          insertSymbol(1, i);
          arr[1][i] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[1][i] == playerOne &&
                   arr[1][i] == arr[2][i] &&
                   arr[0][i] === 0) {
          insertSymbol(0, i);
          arr[0][i] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;

          //----- DIAGONAL -----
        } else if (arr[0][0] == playerOne &&
                   arr[0][0] == arr[1][1] &&
                   arr[2][2] === 0) {
          insertSymbol(2, 2);
          arr[2][2] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[1][1] == playerOne &&
                   arr[1][1] == arr[2][2] &&
                   arr[0][0] === 0) {
          insertSymbol(0, 0);
          arr[0][0] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[0][0] == playerOne &&
                   arr[0][0] == arr[2][2] &&
                   arr[1][1] === 0) {
          insertSymbol(1, 1);
          arr[1][1] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[0][2] == playerOne &&
                   arr[0][2] == arr[1][1] &&
                   arr[2][0] === 0) {
          insertSymbol(2, 0);
          arr[2][0] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[0][2] == playerOne &&
                   arr[0][2] == arr[2][0] &&
                   arr[1][1] === 0) {
          insertSymbol(1, 1);
          arr[1][1] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        } else if (arr[1][1] == playerOne &&
                   arr[1][1] == arr[2][0] &&
                   arr[0][2] === 0) {
          insertSymbol(0, 2);
          arr[0][2] = playerTwo;
          turn = playerOne;
          $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
          return true;
        }
      }
    }
    return false;
  }

  //This function sets up a win for the computer for its next turn if the player does not block its next move.
  function setupWin() {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] == playerTwo &&
          arr[i][1] === 0 &&
          arr[i][2] === 0 &&
          turn == playerTwo) {
        insertSymbol(i, 2);
        arr[i][2] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[i][0] === 0 &&
                 arr[i][1] == playerTwo &&
                 arr[i][2] === 0 &&
                 turn == playerTwo) {
        insertSymbol(i, 0);
        arr[i][0] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[i][0] === 0 &&
                 arr[i][1] === 0 &&
                 arr[i][2] == playerTwo &&
                 turn == playerTwo) {
        insertSymbol(i, 1);
        arr[i][1] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;

      //----- COLUMNS -----
      } else if (arr[0][i] == playerTwo &&
                 arr[1][i] === 0 &&
                 arr[2][i] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, i);
        arr[2][i] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][i] === 0 &&
                 arr[1][i] == playerTwo &&
                 arr[2][i] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0, i);
        arr[0][i] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][i] === 0 &&
                 arr[1][i] === 0 &&
                 arr[2][i] == playerTwo &&
                 turn == playerTwo) {
        insertSymbol(1, i);
        arr[1][i] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;

      //----- DIAGONAL -----
      } else if (arr[0][0] == playerTwo &&
                 arr[1][1] === 0 &&
                 arr[2][2] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, 2);
        arr[2][2] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][0] === 0 &&
                 arr[1][1] == playerTwo &&
                 arr[2][2] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0, 0);
        arr[0][0] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][0] === 0 &&
                 arr[1][1] === 0 &&
                 arr[2][2] == playerTwo &&
                 turn == playerTwo) {
        insertSymbol(1, 1);
        arr[1][1] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][2] == playerTwo &&
                 arr[1][1] === 0 &&
                 arr[2][0] === 0 &&
                 turn == playerTwo) {
        insertSymbol(2, 0);
        arr[2][0] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][2] === 0 &&
                 arr[1][1] == playerTwo &&
                 arr[2][0] === 0 &&
                 turn == playerTwo) {
        insertSymbol(0, 2);
        arr[0][2] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
        return true;
      } else if (arr[0][2] === 0 &&
                 arr[1][1] === 0 &&
                 arr[2][0] == playerTwo &&
                 turn == playerTwo) {
        insertSymbol(1, 1);
        arr[1][1] = playerTwo;
        turn = playerOne;
        $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
      }
    }
    return false;
  }

  //This function draws the game and resets the board state for another game
  function drawGame() {
    $(".turnIndicators").hide();
    $('#winMessage').text("It's a draw!");
    $('#gameOverScreen').fadeIn(500);
    arr = [];
  }

  //This function is for when the computer goes first and needs to make a random move
  function randomTurn() {
    if (checkBlank() === true &&
        turn == playerTwo) {
      var val1 = getRandom(0, 2);
      var val2 = getRandom(0, 2);
      while (arr[val1][val2] !== 0) {
        val1 = getRandom(0, 2);
        val2 = getRandom(0, 2);
      }
      insertSymbol(val1, val2);
      arr[val1][val2] = playerTwo;
      turn = playerOne;
      $('#compTurn').delay(1000).fadeOut(500, function() {
            $('#playerTurn').fadeIn(500);
          });
      return true;
    }
    return false;
  }

  //This function checks the board state to see if a win has been achieved
  function checkWin() {
    var row;
    var column;
    for (var i = 0; i < arr[0].length; i++) {
      //Case for matching rows
      if (arr[i][0] !== 0 &&
          arr[i][0] == arr[i][1] &&
          arr[i][1] == arr[i][2]) {
        gameMode = "";
        row = [i, i, i];
        column = [0, 1, 2];
        $(".turnIndicators").hide();
        gameOverMsg();
        $("#gameOverScreen").fadeIn(500);
        $($tableCells).each(function() {
          //Colour in the winning cells
          for (var j = 0; j < row.length; j++) {
            if ($(this).attr("row") == row[j] &&
                $(this).attr("position") == column[j]) {
              $(this).css("background", "#28876e");
            }
          }
        });
        arr = [];
      }
      //Case for matching columns
      if (arr[0][i] !== 0 &&
          arr[0][i] == arr[1][i] &&
          arr[1][i] == arr[2][i]) {
        row = [0, 1, 2];
        column = [i, i, i];
        $(".turnIndicators").hide();
        gameOverMsg();
        $("#gameOverScreen").fadeIn(500);
        $tableCells.each(function() {
          //Colour in the winning cells
          for (var j = 0; j < row.length; j++) {
            if ($(this).attr("row") == row[j] &&
                $(this).attr("position") == column[j]) {
              $(this).css("background", "#28876e");
            }
          }
        });
        arr = [];
      }
      //Case for matching diagonals
      if (arr[0][0] !== 0 &&
          arr[0][0] == arr[1][1] &&
          arr[1][1] == arr[2][2]) {
        row = [0, 1, 2];
        column = [0, 1, 2];
        $(".turnIndicators").hide();
        gameOverMsg();
        $("#gameOverScreen").fadeIn(500);
        $tableCells.each(function() {
          //Colour in the winning cells
          for (var j = 0; j < row.length; j++) {
            if ($(this).attr("row") == row[j] &&
                $(this).attr("position") == column[j]) {
              $(this).css("background", "#28876e");
            }
          }
        });
        arr = [];
      }
      if (arr[0][2] !== 0 &&
          arr[0][2] == arr[1][1] &&
          arr[1][1] == arr[2][0]) {
        row = [0, 1, 2];
        column = [2, 1, 0];
        $(".turnIndicators").hide();
        gameOverMsg();
        $("#gameOverScreen").fadeIn(500);
        ($tableCells).each(function() {
          //Colour in the winning cells
          for (var j = 0; j < row.length; j++) {
            if ($(this).attr("row") == row[j] &&
                $(this).attr("position") == column[j]) {
              $(this).css("background", "#28876e");
            }
          }
        });
        arr = [];
      }
    }
    //If all spots are taken and there is no match then it means the game is a draw
    if (checkBlank() === false) {
      drawGame();
    }
  }

  //Computer turn function: flows down from top priority move functions to least priority move functions ending with drawing the game if no spots are available on the board
  function computerTurn() {
    if (endGame()) {
      endGame();
    } else if (blockWin()) {
      blockWin();
    } else if (setupWin()) {
      setupWin();
    } else if (randomTurn()) {
      randomTurn();
    } else {
      drawGame();
    }
    checkWin();
  }

  //Deciding to play again
  $('#playAgain').on('click', function() {
    arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    $('.symbol').hide();
    $('#gameOverScreen').hide();
    $('#playerScreen').fadeIn(500);
    $('td').css("background", "");
    arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  });

  //This fades in the 1P or 2P options
  $("#playerScreen").fadeIn(500);

  //Choosing single player mode
  $("#oneP").on("click", function(e) {
    gameMode = "oneP";
    $("#playerScreen").fadeOut(500);
    $("#symbolScreen").fadeIn(500);
    $("#singlePlayer").show();
    $("#playerTurn").hide();
    $("#compTurn").hide();
  });

  //Choosing two player mode
  $("#twoP").on("click", function(e) {
    gameMode = "twoP";
    $("#playerScreen").fadeOut(500);
    $("#twoPlayers").show();
    $("#p2").hide();
    $("#p1").hide().fadeIn(500);
    playerOne = turn;
    if (playerOne == "cross") {
      playerTwo = "naught";
    } else {
      playerTwo = "cross";
    }
  });

  //Choosing naughts or crosses (1P mode)
  $("#crosses").on("click", function(e) {
    playerOne = "cross";
    playerTwo = "naught";
    $("#symbolScreen").fadeOut(500);
    if (playerOne == turn) {
      $("#playerTurn").fadeIn(500);
    } else {
      $("#compTurn").fadeIn(500);
      computerTurn();
    }
  });
  $("#naughts").on("click", function(e) {
    playerOne = "naught";
    playerTwo = "cross";
    $("#symbolScreen").fadeOut(500);
    if (playerOne == turn) {
      $("#playerTurn").fadeIn(500);
    } else {
      $("#compTurn").fadeIn(500);
      computerTurn();
    }
  });

  //Actual game event handler for each turn taken
  $("td").on("click", function(e) {
    e.preventDefault();

    //------- TWO PLAYER MODE -------
    if (gameMode == "twoP") {
      if (arr[$(this).attr("row")][$(this).attr("position")] === 0) {
        arr[$(this).attr("row")][$(this).attr("position")] = turn;
        $(this).find("." + turn).show();
        checkWin();
        if (turn == "cross") {
          turn = "naught";
        } else {
          turn = "cross";
        }
      }
      if (turn != playerOne) {
        $("#p1").hide();
        $("#p2").fadeIn(500);
      } else {
        $("#p2").hide();
        $("#p1").fadeIn(500);
      }

    //------- SINGLE PLAYER MODE -------
    } else {
      if (arr[$(this).attr("row")][$(this).attr("position")] === 0) {
        arr[$(this).attr("row")][$(this).attr("position")] = turn;
        $(this).find("." + turn).show();
        checkWin();
        if (turn == "cross") {
          turn = "naught";
        } else {
          turn = "cross";
        }
        $('#playerTurn').hide();
        $('#compTurn').fadeIn(500);
        computerTurn();
      }
    }
  });
});
