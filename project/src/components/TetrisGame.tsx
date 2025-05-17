import React, { useEffect, useRef, useState } from 'react';

// 方块形状定义
const TETROMINOES = [
  // I 形
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00BFFF' // 浅蓝色
  },
  // J 形
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000CD' // 深蓝色
  },
  // L 形
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#FFA500' // 橙色
  },
  // O 形
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#FFFF00' // 黄色
  },
  // S 形
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00FF00' // 绿色
  },
  // T 形
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#9400D3' // 紫色
  },
  // Z 形
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#FF0000' // 红色
  }
];

// 创建一个空的游戏板
const createBoard = (width: number, height: number) => {
  return Array.from({ length: height }, () => 
    Array.from({ length: width }, () => ({ value: 0, color: 'transparent' }))
  );
};

const TetrisGame: React.FC = () => {
  // 游戏常量
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 20;
  const CELL_SIZE = 30;
  const GAME_SPEED = 1000; // 初始速度，毫秒
  
  // 游戏状态
  const [board, setBoard] = useState(createBoard(BOARD_WIDTH, BOARD_HEIGHT));
  const [currentPiece, setCurrentPiece] = useState<any>(null);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextPiece, setNextPiece] = useState<any>(null);
  
  // 游戏循环相关
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(GAME_SPEED);
  
  // 游戏操作函数
  const getRandomPiece = () => {
    const randomIndex = Math.floor(Math.random() * TETROMINOES.length);
    return {
      ...TETROMINOES[randomIndex],
      shape: [...TETROMINOES[randomIndex].shape.map(row => [...row])]
    };
  };
  
  const startGame = () => {
    // 初始化游戏状态
    setBoard(createBoard(BOARD_WIDTH, BOARD_HEIGHT));
    const firstPiece = getRandomPiece();
    const secondPiece = getRandomPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setCurrentPos({ 
      x: Math.floor((BOARD_WIDTH - firstPiece.shape[0].length) / 2), 
      y: 0 
    });
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setPaused(false);
    setGameStarted(true);
    speedRef.current = GAME_SPEED;
    
    // 开始游戏循环
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      moveDown();
    }, speedRef.current);
  };
  
  const pauseGame = () => {
    if (gameOver) return;
    
    setPaused(prev => {
      const newPaused = !prev;
      if (newPaused) {
        // 暂停游戏
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // 恢复游戏
        timerRef.current = setInterval(() => {
          moveDown();
        }, speedRef.current);
      }
      return newPaused;
    });
  };
  
  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // 检查是否可以移动到目标位置
  const canMove = (pieceShape: number[][], targetPos: { x: number, y: number }) => {
    for (let y = 0; y < pieceShape.length; y++) {
      for (let x = 0; x < pieceShape[y].length; x++) {
        if (pieceShape[y][x] !== 0) {
          const boardX = targetPos.x + x;
          const boardY = targetPos.y + y;
          
          // 检查边界
          if (
            boardX < 0 || 
            boardX >= BOARD_WIDTH || 
            boardY >= BOARD_HEIGHT
          ) {
            return false;
          }
          
          // 检查碰撞
          if (
            boardY >= 0 &&
            board[boardY][boardX].value !== 0
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };
  
  // 将当前方块固定到游戏板上
  const lockPiece = () => {
    const newBoard = [...board.map(row => [...row.map(cell => ({ ...cell }))])];
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardY = currentPos.y + y;
          const boardX = currentPos.x + x;
          
          if (boardY < 0) {
            // 如果方块锁定时部分在顶部以上，游戏结束
            endGame();
            return;
          }
          
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = { 
              value: 1, 
              color: currentPiece.color 
            };
          }
        }
      }
    }
    
    setBoard(newBoard);
    
    // 检查是否有完整行
    checkRows(newBoard);
    
    // 生成下一个方块
    const nextPieceToUse = nextPiece;
    const brandNewPiece = getRandomPiece();
    setCurrentPiece(nextPieceToUse);
    setNextPiece(brandNewPiece);
    setCurrentPos({ 
      x: Math.floor((BOARD_WIDTH - nextPieceToUse.shape[0].length) / 2), 
      y: 0 
    });
    
    // 检查是否可以放置新方块
    if (!canMove(nextPieceToUse.shape, { 
      x: Math.floor((BOARD_WIDTH - nextPieceToUse.shape[0].length) / 2), 
      y: 0 
    })) {
      endGame();
    }
  };
  
  // 检查并清除完整行
  const checkRows = (board: any[][]) => {
    let rowsCleared = 0;
    
    const newBoard = [...board];
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell.value !== 0)) {
        // 行已满
        rowsCleared++;
        
        // 移除该行，并在顶部添加一行
        newBoard.splice(y, 1);
        newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => ({ value: 0, color: 'transparent' })));
        
        // 调整索引，因为我们刚刚移除了一行
        y++;
      }
    }
    
    if (rowsCleared > 0) {
      // 更新分数
      const pointsPerLine = [0, 40, 100, 300, 1200]; // 0, 1, 2, 3, 4 行的分数
      const pointsScored = pointsPerLine[Math.min(rowsCleared, 4)] * level;
      
      setScore(prev => {
        const newScore = prev + pointsScored;
        
        // 检查级别
        const newLevel = Math.floor(newScore / 1000) + 1;
        if (newLevel > level) {
          setLevel(newLevel);
          // 增加游戏速度
          speedRef.current = Math.max(100, GAME_SPEED - (newLevel - 1) * 100);
          
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              moveDown();
            }, speedRef.current);
          }
        }
        
        return newScore;
      });
      
      setBoard(newBoard);
    }
  };
  
  // 方块操作
  const moveLeft = () => {
    if (gameOver || paused) return;
    
    const newPos = { ...currentPos, x: currentPos.x - 1 };
    if (canMove(currentPiece.shape, newPos)) {
      setCurrentPos(newPos);
    }
  };
  
  const moveRight = () => {
    if (gameOver || paused) return;
    
    const newPos = { ...currentPos, x: currentPos.x + 1 };
    if (canMove(currentPiece.shape, newPos)) {
      setCurrentPos(newPos);
    }
  };
  
  const moveDown = () => {
    if (gameOver || paused) return;
    
    const newPos = { ...currentPos, y: currentPos.y + 1 };
    if (canMove(currentPiece.shape, newPos)) {
      setCurrentPos(newPos);
    } else {
      // 不能再向下移动，锁定当前方块
      lockPiece();
    }
  };
  
  const hardDrop = () => {
    if (gameOver || paused) return;
    
    let dropY = currentPos.y;
    while (canMove(currentPiece.shape, { ...currentPos, y: dropY + 1 })) {
      dropY++;
    }
    
    setCurrentPos({ ...currentPos, y: dropY });
    // 锁定方块
    lockPiece();
  };
  
  const rotate = () => {
    if (gameOver || paused) return;
    
    // 创建旋转后的矩阵
    const rotatedShape = currentPiece.shape[0].map((_, index) => 
      currentPiece.shape.map(row => row[index]).reverse()
    );
    
    // 尝试普通旋转
    if (canMove(rotatedShape, currentPos)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
      return;
    }
    
    // 尝试墙踢（即旋转时遇到障碍物，尝试移动位置）
    const kicks = [
      { x: 1, y: 0 },  // 右踢
      { x: -1, y: 0 }, // 左踢
      { x: 0, y: -1 }, // 上踢
      { x: 2, y: 0 },  // 右踢两格
      { x: -2, y: 0 }, // 左踢两格
    ];
    
    for (const kick of kicks) {
      const kickedPos = { 
        x: currentPos.x + kick.x, 
        y: currentPos.y + kick.y 
      };
      
      if (canMove(rotatedShape, kickedPos)) {
        setCurrentPiece({ ...currentPiece, shape: rotatedShape });
        setCurrentPos(kickedPos);
        return;
      }
    }
  };
  
  // 绘制游戏
  const renderBoard = () => {
    const boardWithPiece = [...board.map(row => [...row.map(cell => ({ ...cell }))])];
    
    // 绘制当前方块
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = currentPos.y + y;
            const boardX = currentPos.x + x;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              boardWithPiece[boardY][boardX] = { 
                value: 1, 
                color: currentPiece.color,
                isActive: true  // 标记为活动方块
              };
            }
          }
        }
      }
    }
    
    return (
      <div className="grid grid-cols-10 gap-0 border-2 border-gray-800 bg-gray-900">
        {boardWithPiece.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div 
              key={`${rowIndex}-${cellIndex}`}
              className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] border border-gray-700 ${cell.isActive ? 'animate-pulse' : ''}`}
              style={{ 
                backgroundColor: cell.color,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`
              }}
            />
          ))
        ))}
      </div>
    );
  };
  
  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    // 计算显示区域的大小
    const pieceWidth = nextPiece.shape[0].length;
    const pieceHeight = nextPiece.shape.length;
    
    // 创建一个显示下一个方块的小网格
    const nextPieceGrid = Array.from({ length: pieceHeight }, () => 
      Array.from({ length: pieceWidth }, () => ({ value: 0, color: 'transparent' }))
    );
    
    // 填充方块信息
    for (let y = 0; y < pieceHeight; y++) {
      for (let x = 0; x < pieceWidth; x++) {
        if (nextPiece.shape[y][x] !== 0) {
          nextPieceGrid[y][x] = { 
            value: 1, 
            color: nextPiece.color
          };
        }
      }
    }
    
    return (
      <div className="border-2 border-gray-800 bg-gray-900 p-2">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${pieceWidth}, ${CELL_SIZE}px)`,
          gap: '1px'
        }}>
          {nextPieceGrid.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
              <div 
                key={`next-${rowIndex}-${cellIndex}`}
                style={{ 
                  backgroundColor: cell.color,
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  border: '1px solid rgba(75, 85, 99, 0.3)'
                }}
              />
            ))
          ))}
        </div>
      </div>
    );
  };
  
  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case ' ':
          hardDrop();
          break;
        case 'p':
        case 'P':
          pauseGame();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, paused, currentPiece, currentPos, board]);
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">俄罗斯方块</h2>
          <p className="text-xl text-gray-600 mb-8">
            经典游戏，考验你的反应速度和空间思维
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="relative">
            {/* 游戏主界面 */}
            {renderBoard()}
            
            {/* 游戏开始覆盖层 */}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <button
                  onClick={startGame}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-lg transition-colors"
                >
                  开始游戏
                </button>
              </div>
            )}
            
            {/* 游戏暂停覆盖层 */}
            {paused && gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="text-white text-2xl font-bold">已暂停</div>
              </div>
            )}
            
            {/* 游戏结束覆盖层 */}
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
                <div className="text-white text-2xl font-bold mb-4">游戏结束!</div>
                <div className="text-white text-xl mb-6">得分: {score}</div>
                <button
                  onClick={startGame}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-lg transition-colors"
                >
                  再来一局
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6">
            {/* 游戏信息 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">得分</h3>
                <div className="text-3xl font-bold text-red-600">{score}</div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">等级</h3>
                <div className="text-3xl font-bold text-blue-600">{level}</div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">下一个</h3>
                {renderNextPiece()}
              </div>
            </div>
            
            {/* 操作说明 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">操作说明</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><span className="bg-gray-200 px-2 py-1 rounded mr-2">←→</span> 左右移动</li>
                <li className="flex items-center"><span className="bg-gray-200 px-2 py-1 rounded mr-2">↓</span> 加速下落</li>
                <li className="flex items-center"><span className="bg-gray-200 px-2 py-1 rounded mr-2">↑</span> 旋转方块</li>
                <li className="flex items-center"><span className="bg-gray-200 px-2 py-1 rounded mr-2">空格</span> 硬下落</li>
                <li className="flex items-center"><span className="bg-gray-200 px-2 py-1 rounded mr-2">P</span> 暂停游戏</li>
              </ul>
            </div>
            
            {/* 控制按钮 */}
            <div className="flex gap-4">
              {gameStarted ? (
                <>
                  <button
                    onClick={pauseGame}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    {paused ? '继续' : '暂停'}
                  </button>
                  <button
                    onClick={startGame}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    重新开始
                  </button>
                </>
              ) : (
                <button
                  onClick={startGame}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  开始游戏
                </button>
              )}
            </div>
            
            {/* 移动端控制 */}
            <div className="md:hidden">
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="col-start-2">
                  <button
                    onClick={rotate}
                    className="w-full h-12 bg-gray-200 flex items-center justify-center rounded-md"
                  >
                    旋转
                  </button>
                </div>
                <div className="col-start-1 row-start-2">
                  <button
                    onClick={moveLeft}
                    className="w-full h-12 bg-gray-200 flex items-center justify-center rounded-md"
                  >
                    ←
                  </button>
                </div>
                <div className="col-start-2 row-start-2">
                  <button
                    onClick={hardDrop}
                    className="w-full h-12 bg-gray-200 flex items-center justify-center rounded-md"
                  >
                    落下
                  </button>
                </div>
                <div className="col-start-3 row-start-2">
                  <button
                    onClick={moveRight}
                    className="w-full h-12 bg-gray-200 flex items-center justify-center rounded-md"
                  >
                    →
                  </button>
                </div>
                <div className="col-start-2 row-start-3">
                  <button
                    onClick={moveDown}
                    className="w-full h-12 bg-gray-200 flex items-center justify-center rounded-md"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TetrisGame; 