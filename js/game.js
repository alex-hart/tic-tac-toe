//Document ready check
$(function() {
  var $turnIndicators = $(".turn-indicators");
  var $tableCells = $("td");
  var $winMessage = $('#win-message');
  var $compTurn = $('#comp-turn');
  var $playerTurn = $('#player-turn');
  var $gameOverScreen = $('#game-over-screen');
  var $playerScreen = $("#player-screen");
  var $symbolScreen = $("#symbol-screen");
  var playerTurn = $("#player-turn");
  var compTurn = $("#comp-turn");
  var $p1 = $("#p1");
  var $p2 = $("#p2");
  //Hide indicators, symbols and selection screen
  $turnIndicators.hide();
  $(".selection-screen").hide();
  //Array of the tic tac toe board
  var arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  var scenarioArr;
  var emptyRow, emptyColumn;

  //Randomly decide who goes first
  var turn;
  function decideTurn() {
    var randomNo = Math.round(Math.random());
    if (randomNo === 0) {
      turn = "cross";
    } else {
      turn = "naught";
    }
  }

  //Variables to track game type and who's turn it is and flag variable to
  //Allow single-player click
  var gameMode, playerOne, playerTwo;
  var click = false;

  //Function to generate random number between min and max val, used for when
  //Computer has to make a random move if going first
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function allowClick() {
    click = true;
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
    console.log(turn);
    if (gameMode == "twoP") {
      if (turn == playerOne) {
        $winMessage.text("Player 1 won!");
      } else {
        $winMessage.text("Player 2 won!");
      }
    } else if (gameMode == "oneP") {
      if (turn == playerOne) {
        $winMessage.text("You won!");
      } else {
        $winMessage.text("You lost!");
      }
    }
  }

  function insertSymbol(row, column) {
    $tableCells.each(function() {
      var $this = $(this);
      if ($this.attr("row") == row &&
          $this.attr("position") == column) {
        if (playerTwo == "cross") {
          $this.prepend('<img class="symbol '
          + playerTwo +
          '" src="images/cross_icon.png"/>');
          $this.children("img").hide().delay(1000).fadeIn(500);
        } else {
          $this.prepend('<img class="symbol '
          + playerTwo +
          '" src="images/circle_icon.png"/>');
          $this.children("img").hide().delay(1000).fadeIn(500)
        }
      }
    });
  }

  // ----- COMPUTER AI -----
  function rowChecker(scenarioArr) {
    var tempArr = scenarioArr.slice();
    emptyColumn = 2;
    emptyRow = 0;
    for (i = 0; i < tempArr.length; i++) {
      for (j = 0; j < arr.length; j++) {
        if (
          arr[j][0] == tempArr[0] &&
          arr[j][1] == tempArr[1] &&
          arr[j][2] == tempArr[2]
        ) {
          emptyRow = j;
          return true;
        }
      }
      tempArr.push(tempArr.shift());
      emptyColumn--;
    }
    return false;
  }

  function columnChecker(scenarioArr) {
    var tempArr = scenarioArr.slice();
    emptyColumn = 0;
    emptyRow = 2;
    for (i = 0; i < tempArr.length; i++) {
      for (j = 0; j < arr.length; j++) {
        if (
          arr[0][j] == tempArr[0] &&
          arr[1][j] == tempArr[1] &&
          arr[2][j] == tempArr[2]
        ) {
          emptyColumn = j;
          return true;
        }
      }
      tempArr.push(tempArr.shift());
      emptyRow--;
    }
    return false;
  }

  function diagChecker1(scenarioArr) {
    var tempArr = scenarioArr.slice();
    emptyColumn = 2;
    emptyRow = 2;
    for (i = 0; i < tempArr.length; i++) {
      if (
        arr[0][0] == tempArr[0] &&
        arr[1][1] == tempArr[1] &&
        arr[2][2] == tempArr[2]
      ) {
        return true;
      }
      tempArr.push(tempArr.shift());
      emptyColumn--;
      emptyRow--;
    }
    return false;
  }

  function diagChecker2(scenarioArr) {
    var tempArr = scenarioArr.slice();
    emptyColumn = 0;
    emptyRow = 2;
    for (i = 0; i < tempArr.length; i++) {
      if (
        arr[0][2] == tempArr[0] &&
        arr[1][1] == tempArr[1] &&
        arr[2][0] == tempArr[2]
      ) {
        return true;
      }
      tempArr.push(tempArr.shift());
      emptyColumn++;
      emptyRow--;
    }
    return false;
  }

  function endOfTurn(emptyRow, emptyColumn) {
    insertSymbol(emptyRow, emptyColumn);
    arr[emptyRow][emptyColumn] = playerTwo;
    turn = playerOne;
    $compTurn.delay(1000).fadeOut(500, function() {
      $playerTurn.fadeIn(500);
    });
    setTimeout(allowClick, 2000);
  }

  //Function to end the game if the computer can make such a move.
  //It essentially looks for every possible combination where two naughts or
  //Crosses are lined up with the third space blank as well. This is checked by
  //Using the array as a model of the current board state
  function endGame() {
    if (turn == playerTwo) {
      scenarioArr = [playerTwo, playerTwo, 0];
      if (rowChecker(scenarioArr)) {
        insertSymbol(emptyRow, emptyColumn);
        arr[emptyRow][emptyColumn] = playerTwo;
        return true;
      } else if (columnChecker(scenarioArr)) {
        insertSymbol(emptyRow, emptyColumn);
        arr[emptyRow][emptyColumn] = playerTwo;
        return true;
      } else if (diagChecker1(scenarioArr)) {
        insertSymbol(emptyRow, emptyColumn);
        arr[emptyRow][emptyColumn] = playerTwo;
        return true;
      } else if (diagChecker2(scenarioArr)) {
        insertSymbol(emptyRow, emptyColumn);
        arr[emptyRow][emptyColumn] = playerTwo;
        return true;
      } else {
        return false;
      }
    }
  }

  //This function is for the computer to block the human player from winning.
  //It is essentially the same As the above function but checks for the
  //Player's symbols rather than its own.
  function blockWin() {
    if (turn == playerTwo) {
      scenarioArr = [playerOne, playerOne, 0];
      if (rowChecker(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (columnChecker(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (diagChecker1(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (diagChecker2(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else {
        return false;
      }
    }
  }

  //This function sets up a win for the computer for its next turn if the
  //Player does not block its next move.
  function setupWin() {
    if (turn == playerTwo) {
      scenarioArr = [playerTwo, 0, 0];
      if (rowChecker(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (columnChecker(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (diagChecker1(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else if (diagChecker2(scenarioArr)) {
        endOfTurn(emptyRow, emptyColumn);
        return true;
      } else {
        return false;
      }
    }
  }

  //This function draws the game and resets the board state for another game
  function drawGame() {
    $turnIndicators.hide();
    $winMessage.text("It's a draw!");
    $gameOverScreen.fadeIn(500);
    arr = [];
  }

  //This function is for when the computer goes first and needs to make a
  //Random move
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
      $compTurn.delay(1000).fadeOut(500, function() {
        $playerTurn.fadeIn(500);
      });
      setTimeout(allowClick, 2000);
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
        row = [i, i, i];
        column = [0, 1, 2];
        $turnIndicators.hide();
        gameOverMsg();
        $gameOverScreen.fadeIn(500);
        return $tableCells.each(function() {
          var $this = $(this);
          //Colour in the winning cells
          for (var j = 0; j < row.length; j++) {
            if ($this.attr("row") == row[j] &&
                $this.attr("position") == column[j]) {
              $this.css("background", "#28876e");
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
        $turnIndicators.hide();
        gameOverMsg();
        $gameOverScreen.fadeIn(500);
        return $tableCells.each(function() {
          //Colour in the winning cells
          var $this = $(this);
          for (var j = 0; j < row.length; j++) {
            if ($this.attr("row") == row[j] &&
                $this.attr("position") == column[j]) {
              $this.css("background", "#28876e");
            }
          }
        });
      }
      //Case for matching diagonals
      if (arr[0][0] !== 0 &&
          arr[0][0] == arr[1][1] &&
          arr[1][1] == arr[2][2]) {
        row = [0, 1, 2];
        column = [0, 1, 2];
        $turnIndicators.hide();
        gameOverMsg();
        $gameOverScreen.fadeIn(500);
        return $tableCells.each(function() {
          //Colour in the winning cells
          var $this = $(this);
          for (var j = 0; j < row.length; j++) {
            if ($this.attr("row") == row[j] &&
                $this.attr("position") == column[j]) {
              $this.css("background", "#28876e");
            }
          }
        });
      }
      if (arr[0][2] !== 0 &&
          arr[0][2] == arr[1][1] &&
          arr[1][1] == arr[2][0]) {
        row = [0, 1, 2];
        column = [2, 1, 0];
        $turnIndicators.hide();
        gameOverMsg();
        $gameOverScreen.fadeIn(500);
        return $tableCells.each(function() {
          //Colour in the winning cells
          var $this = $(this);
          for (var j = 0; j < row.length; j++) {
            if ($this.attr("row") == row[j] &&
                $this.attr("position") == column[j]) {
              $this.css("background", "#28876e");
            }
          }
        });
      }
    }
    //If all spots are taken and there is no match then it means the game
    //Is a draw
    if (checkBlank() === false) {
      drawGame();
    }
  }

  //Computer turn function: flows down from top priority move functions to
  //Least priority move functions ending with drawing the game if no spots are
  //Available on the board
  function computerTurn() {
    if (endGame()) {
      checkWin();
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
  $('#play-again').on('click', function() {
    arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    $tableCells.each(function() {
      var symbol = $(this).children("img");
      symbol.remove();
    });
    $gameOverScreen.hide();
    $('td').css("background", "");
    click = false;
    init()
  });

  function init() {
    decideTurn();
    $playerScreen.fadeIn(500);
  }

  //Choosing single player mode
  $("#one-p").on("click", function(e) {
    gameMode = "oneP";
    $playerScreen.fadeOut(500);
    $symbolScreen.fadeIn(500);
    $("#single-player").show();
    $playerTurn.hide();
    $compTurn.hide();
  });

  //Choosing two player mode
  $("#two-p").on("click", function(e) {
    gameMode = "twoP";
    $playerScreen.fadeOut(500);
    $("#two-players").show();
    $p2.hide();
    $p1.hide().fadeIn(500);
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
    $symbolScreen.fadeOut(500);
    if (playerOne == turn) {
      $playerTurn.fadeIn(500);
      click = true;
    } else {
      $compTurn.fadeIn(500);
      computerTurn();
    }
  });
  $("#naughts").on("click", function(e) {
    playerOne = "naught";
    playerTwo = "cross";
    $symbolScreen.fadeOut(500);
    if (playerOne == turn) {
      $playerTurn.fadeIn(500);
      click = true;
    } else {
      $compTurn.fadeIn(500);
      computerTurn();
    }
  });

  //Actual game event handler for each turn taken
  $tableCells.on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    //------- TWO PLAYER MODE -------
    if (gameMode == "twoP") {
      if (arr[$this.attr("row")][$this.attr("position")] === 0) {
        arr[$this.attr("row")][$this.attr("position")] = turn;
        if (turn == "cross") {
          $this.prepend('<img class="symbol '
          + playerTwo +
          '" src="images/cross_icon.png"/>');
        } else {
          $this.prepend('<img class="symbol '
          + playerTwo +
          '" src="images/circle.png"/>');
        }
        checkWin();
        if (turn == "cross") {
          turn = "naught";
        } else {
          turn = "cross";
        }
      }
      if (turn != playerOne) {
        $p1.hide();
        $p2.fadeIn(500);
      } else {
        $p2.hide();
        $p1.fadeIn(500);
      }

    //------- SINGLE PLAYER MODE -------
    } else {
      if (
        arr[$this.attr("row")][$this.attr("position")] === 0 &&
        click === true
      ) {
        arr[$this.attr("row")][$this.attr("position")] = turn;
        if (turn == "cross") {
          $this.prepend('<img class="symbol '
          + playerTwo +
          '" src="images/cross_icon.png"/>');
        } else {
          $this.prepend('<img class="symbol '
          + playerTwo
          + '" src="images/circle_icon.png"/>');
        }
        checkWin();
        if (turn == "cross") {
          turn = "naught";
        } else {
          turn = "cross";
        }
        $playerTurn.hide();
        $compTurn.fadeIn(500);
        click = false;
        computerTurn();
      }
    }
  });
  init();
});
