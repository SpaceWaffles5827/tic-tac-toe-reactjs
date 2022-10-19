import './App.css';
import { useState, React } from 'react';


function App() {
  
  const [ boardData, setBoardData ] = useState([null, null, null, null, null, null, null, null, null]);
  const [ player, setPlayer ] = useState('X');

  const updateBoard = (index) => {
    const newBoardData = [...boardData];
    if(newBoardData[index] === null) {
      newBoardData[index] = player;
      setBoardData(newBoardData);
      switchPlayer();
    }
  }

  const switchPlayer = () => {
    if (player === 'X') {
      setPlayer('O');
    } else {
      setPlayer('X');
    }
  }

  const checkForTie = () => {
    let isTie = true;
    boardData.forEach((value) => {
      if (value === null) {
        isTie = false;
      }
    });
    return isTie;
  }

  const checkForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    if(checkForTie()) {
      return 'Tie';
    }
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
        console.log('winner:', boardData[a]);
        return(boardData[a]);
      }
    }
    return(null);
  }

  function Tile({value, index}){
    return(
      <div className="Tile" onClick={() => updateBoard(index)}>
        <h1>{value}</h1>
      </div>
    )
  }
  
  function Board(){
    return(
      <div className="Board">
        {
          boardData.map((tile, index) => {
            return <Tile key={index} value={tile} index={index}></Tile>
          })
        }
      </div>
    )
  }

  return (
    <div className="App">
      <Board></Board>
      {checkForWinner() ? checkForWinner()==='Tie' ? <h1>Tie game</h1> : <h1>Winner: {checkForWinner()}</h1> : null}
      {checkForWinner() ? <button onClick={() => setBoardData([null, null, null, null, null, null, null, null, null])}>New Game</button> : null}
    </div>
  );
}

export default App;
