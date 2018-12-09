var board,
    game = new Chess();
 
// ゲームオーバー処理
var onDragStart = function(source, piece, position, orientation) {
	if (game.in_checkmate() === true || game.in_draw() === true ||
			piece.search(/^b/) !== -1) {
	      return false;
	    }
};
 
// CPU処理
var cpuMove = function() {
 var possibleMoves = game.moves();
 
  // ゲームオーバー
  if (possibleMoves.length === 0) return;
 
  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
  board.position(game.fen());
};
 
var onDrop = function(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
});
 
// 想定外の動きを防止
if (move === null) return
 
// CPU移動
window.setTimeout(cpuMove, 250);
};
 
// ボードの更新
var onSnapEnd = function() {
	board.position(game.fen());
};
 
// プレイヤー処理
var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = new ChessBoard('board', cfg);
