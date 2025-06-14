import React, { useState } from "react";
import "./SeatSelector.css";

const SeatSelector = ({ onSelect }) => {
  const rows = 'ABCDEFGHIJKLM'.split('');
  const cols = Array.from({ length: 18 }, (_, i) => i + 1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatId);

    const updatedSeats = isSelected
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updatedSeats);
    onSelect(updatedSeats);
  };

  return (
    <div className="seat-map">
      <div className="screen">SCREEN</div>
      {rows.map((row) => (
        <div key={row} className="seat-row">
          <div className="row-label">{row}</div>
          {cols.map((col) => {
            const isGap = col === 7 || col === 12; // 통로
            if (isGap) return <div key={col} className="seat-gap"></div>;

            const seatId = `${row}-${col}`;
            const isSelected = selectedSeats.includes(seatId);
            return (
              <button
                key={seatId}
                className={`seat ${isSelected ? "selected" : ""}`}
                onClick={() => handleSeatClick(row, col)}
              >
                {col}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
