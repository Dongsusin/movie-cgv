import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";
import "./Booking.css";

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return <div>영화 정보가 없습니다.</div>;

  const handleBooking = () => {
    const ticket = {
      movieTitle: movie.title,
      date,
      time,
      seats: selectedSeats,
    };
    localStorage.setItem("ticket", JSON.stringify(ticket));
    navigate("/ticket");
  };

  return (
    <div className="booking-container">
      <h2>{movie.title} - 좌석 선택</h2>

      <div className="datetime-select">
        <label>
          날짜:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          시간:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
      </div>

      <SeatSelector onSelect={setSelectedSeats} />

      <button
        className="confirm-button"
        onClick={handleBooking}
        disabled={selectedSeats.length === 0 || !date || !time}
      >
        예매 완료
      </button>
    </div>
  );
};

export default Booking;