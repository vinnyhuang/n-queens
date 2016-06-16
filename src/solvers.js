/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.cloneBoard = function(board) {
  var clone = new Board({n:board.get('n')});
  for (var i = 0; i < board.get('n'); i++) {
    clone.set(i, board.get(i).slice());
  }
  return clone;
}

window.rookBacktracking = function(n) {
  if (n === 0)
    return [new Board({n:0})];

  var recurse = function(round) {
    if (round === 0) {
      return [new Board({n:n})];
    }
    var result = recurse(round - 1);
    var num = result.length;

    for (var i = 0; i < num; i++) {
      var cur = result.shift();
      for (var row = 0; row < cur.get('n'); row++) {
        for (var col = 0; col < cur.get('n'); col++) {
          if (cur.lastRowAdded === undefined ||
              row * cur.get('n') + col > cur.lastRowAdded * cur.get('n') + cur.lastColAdded) {
            var child = cloneBoard(cur);
            child.togglePiece(row, col);
            child.lastRowAdded = row;
            child.lastColAdded = col;
            if (!child.hasRowConflictAt(row) && !child.hasColConflictAt(col)) {
              result.push(child);
            }
          }
        }
      }
    }
    return result;
  }

  return recurse(n);
}

window.findNRooksSolution = function(n) {
  var solution = rookBacktracking(n)[0].rows();
  console.log(n, solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = rookBacktracking(n).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.queenBacktracking = function(n) {
  if (n === 0)
    return [new Board({n:0})];

  var recurse = function(round) {
    if (round === 0) {
      return [new Board({n:n})];
    }
    var result = recurse(round - 1);
    var num = result.length;

    for (var i = 0; i < num; i++) {
      var cur = result.shift();
      for (var row = 0; row < cur.get('n'); row++) {
        for (var col = 0; col < cur.get('n'); col++) {
          if (cur.lastRowAdded === undefined ||
              row * cur.get('n') + col > cur.lastRowAdded * cur.get('n') + cur.lastColAdded) {
            var child = cloneBoard(cur);
            child.togglePiece(row, col);
            child.lastRowAdded = row;
            child.lastColAdded = col;
            if (!child.hasAnyQueenConflictsOn(row, col)) {
              result.push(child);
            }
          }
        }
      }
    }
    return result;
  }

  return recurse(n);
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = queenBacktracking(n)[0].rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = queenBacktracking(n).length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
