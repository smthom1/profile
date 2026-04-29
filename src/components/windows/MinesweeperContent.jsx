import React, { useState, useEffect, useRef } from 'react';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export default function MinesweeperContent() {
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [flags, setFlags] = useState(0);
  const [timer, setTimer] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  
  const timerRef = useRef(null);

  useEffect(() => {
    initGame();
    return () => clearInterval(timerRef.current);
  }, []);

  const initGame = () => {
    clearInterval(timerRef.current);
    setGameState('playing');
    setFlags(0);
    setTimer(0);
    setFirstClick(true);
    
    // Create empty board
    const newBoard = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          r, c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  const placeMines = (excludeR, excludeC, currentBoard) => {
    let minesPlaced = 0;
    const b = [...currentBoard];
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if ((r !== excludeR || c !== excludeC) && !b[r][c].isMine) {
        b[r][c] = { ...b[r][c], isMine: true };
        minesPlaced++;
      }
    }
    
    // Calculate numbers
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (b[r][c].isMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc].isMine) {
              count++;
            }
          }
        }
        b[r][c] = { ...b[r][c], neighborCount: count };
      }
    }
    return b;
  };

  const revealEmptyNeighbors = (r, c, b) => {
    const queue = [[r,c]];
    while(queue.length > 0) {
      const [cr, cc] = queue.shift();
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            const neighbor = b[nr][nc];
            if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
              b[nr][nc] = { ...neighbor, isRevealed: true };
              if (neighbor.neighborCount === 0) {
                queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }
  };

  const checkWin = (b) => {
    let revealed = 0;
    for (const row of b) {
      for (const cell of row) {
         if (cell.isRevealed) revealed++;
      }
    }
    if (revealed === (ROWS * COLS - MINES)) {
      setGameState('won');
      clearInterval(timerRef.current);
    }
  };

  const onCellClick = (r, c) => {
    if (gameState !== 'playing') return;
    
    let currentBoard = [...board.map(row => [...row])];
    const cell = currentBoard[r][c];
    
    if (cell.isRevealed || cell.isFlagged) return;

    if (firstClick) {
      currentBoard = placeMines(r, c, currentBoard);
      setFirstClick(false);
      timerRef.current = setInterval(() => {
        setTimer(t => Math.min(t + 1, 999));
      }, 1000);
    }

    if (currentBoard[r][c].isMine) {
      setGameState('lost');
      clearInterval(timerRef.current);
      // Reveal all mines
      currentBoard = currentBoard.map(row => row.map(cell => 
        cell.isMine ? { ...cell, isRevealed: true } : cell
      ));
      setBoard(currentBoard);
      return;
    }

    currentBoard[r][c] = { ...currentBoard[r][c], isRevealed: true };
    if (currentBoard[r][c].neighborCount === 0) {
      revealEmptyNeighbors(r, c, currentBoard);
    }

    setBoard(currentBoard);
    checkWin(currentBoard);
  };

  const onCellRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    
    const currentBoard = [...board];
    const cell = currentBoard[r][c];
    if (cell.isRevealed) return;
    
    currentBoard[r][c] = { ...cell, isFlagged: !cell.isFlagged };
    setFlags(f => cell.isFlagged ? f - 1 : f + 1);
    setBoard(currentBoard);
  };

  const getNumberColor = (count) => {
    const colors = ['#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
    return colors[count - 1] || '#000';
  };

  const flagsLeft = Math.max(0, MINES - flags);

  return (
    <div style={{ padding: 4, userSelect: 'none' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--panel)',
        border: '2px inset var(--bevel-dark)',
        padding: 6,
        marginBottom: 8
      }}>
        <div style={{ fontFamily: '"Roboto Mono", monospace', fontWeight: 700, fontSize: 20, background: '#333', color: '#ff4136', padding: '2px 6px', border: '1px solid var(--bevel-dark)', minWidth: 36, textAlign: 'center' }}>
          {String(flagsLeft).padStart(3, '0')}
        </div>
        
        <div 
          onClick={initGame}
          className="win98-button"
          style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          {gameState === 'playing' && <img src="/images/mine_rest.png" alt="smile" style={{ width: 22, height: 22 }} />}
          {gameState === 'lost' && <img src="/images/mine_lost.png" alt="dead" style={{ width: 22, height: 22 }} />}
          {gameState === 'won' && <img src="/images/mine_win.png" alt="cool" style={{ width: 22, height: 22 }} />}
        </div>

        <div style={{ fontFamily: '"Roboto Mono", monospace', fontWeight: 700, fontSize: 20, background: '#333', color: '#ff4136', padding: '2px 6px', border: '1px solid var(--bevel-dark)', minWidth: 36, textAlign: 'center' }}>
          {String(timer).padStart(3, '0')}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 22px)`,
        gridTemplateRows: `repeat(${ROWS}, 22px)`,
        border: '3px inset var(--bevel-dark)',
        background: 'var(--bevel-dark)',
        width: 'fit-content'
      }} onContextMenu={e => e.preventDefault()}>
        {board.flat().map((cell, i) => (
          <div
            key={i}
            onClick={() => onCellClick(cell.r, cell.c)}
            onContextMenu={(e) => onCellRightClick(e, cell.r, cell.c)}
            style={{
              width: 22,
              height: 22,
              border: cell.isRevealed ? '1px solid #999' : '2px outset var(--bevel-light)',
              background: cell.isRevealed ? (cell.isMine && gameState === 'lost' ? '#ff4136' : 'var(--panel)') : 'var(--win-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              cursor: cell.isRevealed ? 'default' : 'pointer',
              color: getNumberColor(cell.neighborCount)
            }}
          >
            {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && cell.neighborCount}
            {cell.isRevealed && cell.isMine && <img src="/images/mine.png" alt="mine" style={{ width: 14, height: 14 }} />}
            {!cell.isRevealed && cell.isFlagged && <img src="/images/mine_flag.png" alt="flag" style={{ width: 14, height: 14 }} />}
            {!cell.isRevealed && gameState === 'lost' && cell.isFlagged && !cell.isMine && '❌'}
          </div>
        ))}
      </div>
    </div>
  );
}
