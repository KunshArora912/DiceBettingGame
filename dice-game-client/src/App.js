import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import metalGlass from '../src/public/assets/images/metal_glass.png';

const App = () => {
  const [dice, setDice] = useState(null);
  const [payout, setPayout] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [glassPosition, setGlassPosition] = useState({ x: 20, y: 0 }); // Default starting position
  const [dragging, setDragging] = useState(false);
  const [hasAttemptedBet, setHasAttemptedBet] = useState(false);
  const [results, setResults] = useState([]); // State for tracking results
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const glassRef = useRef(null);
  const paperRefs = {
    less_than_7: useRef(null),
    equal_to_7: useRef(null),
    greater_than_7: useRef(null),
  };
  const MAX_BET = 100;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setGlassPosition({
          x: e.clientX - glassRef.current.offsetWidth / 2,
          y: e.clientY - glassRef.current.offsetHeight / 2,
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      if (hasAttemptedBet) {
        determineBet();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, hasAttemptedBet]);

  const handleMouseDown = () => {
    setDragging(true);
    setHasAttemptedBet(true); // Mark as attempted bet
  };

  const determineBet = () => {
    const glassRect = glassRef.current.getBoundingClientRect();
    
    let bet = null;
    for (const [key, ref] of Object.entries(paperRefs)) {
      const paperRect = ref.current.getBoundingClientRect();
      if (
        glassRect.left < paperRect.right &&
        glassRect.right > paperRect.left &&
        glassRect.top < paperRect.bottom &&
        glassRect.bottom > paperRect.top
      ) {
        bet = key;
        break;
      }
    }

    if (bet && betAmount > 0) {
      handleRoll(bet);
      setHasAttemptedBet(false);
    } else if (betAmount <= 0) {
      alert('Please enter a valid bet amount greater than 0.');
    } else {
      alert('Please place the glass on one of the options.');
    }
  };

  const handleRoll = (selectedBet) => {
    // Reset glass position to default
    setGlassPosition({ x: 20, y: 0 });

    // Simulate rolling dice
    const rollDice = () => {
      return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    };

    const [dice1, dice2] = rollDice();
    const sum = dice1 + dice2;

    let payoutAmount = 0;
    if ((selectedBet === 'less_than_7' && sum < 7) || (selectedBet === 'greater_than_7' && sum > 7)) {
      payoutAmount = betAmount * 2; // Double the bet
    } else if (selectedBet === 'equal_to_7' && sum === 7) {
      payoutAmount = betAmount * 3; // Triple the bet
    }

    setDice({ dice1, dice2 });
    setPayout(payoutAmount);

    // Update results with limit to the last 4 results
    setResults((prevResults) => {
      const newResult = { round: prevResults.length + 1, payout: payoutAmount };
      const updatedResults = [newResult, ...prevResults];
      return updatedResults.slice(0, 4); // Keep only the latest 4 results
    });

    setTimeout(() => {
      setDice(null);
      setPayout(null);
      // Retain bet amount for next round
    }, 3000); // Clear results after 3 seconds
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <div className="top-section">
        <div className="bet-input">
          <label htmlFor="betAmount">Bet Amount:</label>
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= MAX_BET) {
                setBetAmount(value);
              } else {
                setBetAmount(0); // Reset to 0 if out of range
              }
            }}
            min="0"
            max={MAX_BET}
            placeholder="Enter amount"
          />
        </div>
        <div
          className="glass-icon"
          style={{ left: glassPosition.x, top: glassPosition.y }}
          onMouseDown={handleMouseDown}
          ref={glassRef}
        >
          <img src={metalGlass} alt="Glass" className="metal-glass" />
        </div>
      </div>
      <div className="bet-options">
        <div
          className="bet-option"
          ref={paperRefs.less_than_7}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          &lt; 7
        </div>
        <div
          className="bet-option"
          ref={paperRefs.equal_to_7}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          = 7
        </div>
        <div
          className="bet-option"
          ref={paperRefs.greater_than_7}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          &gt; 7
        </div>
      </div>
      {dice && (
        <div className="dice-result">
          <div className="dice">Dice 1: {dice.dice1}</div>
          <div className="dice">Dice 2: {dice.dice2}</div>
          {payout > 0 && <div className="payout">Payout: ${payout}</div>}
        </div>
      )}
      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.round}</td>
                <td className="payout">${result.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="rules-button" onClick={toggleModal}>Rules</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Game Rules</h2>
            <p>
              1. Drag the glass and place it on one of the betting papers: &lt; 7, = 7, or &gt; 7.<br />
              2. Enter your bet amount (between 0 and 100) in the input field.<br />
              3. Click "Roll" to roll the dice.<br />
              4. If the dice sum matches your bet, you win the payout based on the bet type.<br />
              5. The glass will return to its starting position (x: 20, y: 0) for each new round.<br />
              6. The payout values under the table are displayed in green.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
