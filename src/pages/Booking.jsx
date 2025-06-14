import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";
import "./Booking.css";

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return <div>영화 정보가 없습니다.</div>;

  const handleBooking = () => {
    const ticket = {
      movieTitle: movie.title,
      time: movie.time || "18:00", // 기본 시간
      seats: selectedSeats,
    };
    localStorage.setItem("ticket", JSON.stringify(ticket));
    navigate("/ticket");
  };

  return (
    <div className="booking-container">
      <h2>{movie.title} - 좌석 선택</h2>
      <SeatSelector onSelect={setSelectedSeats} />
      <button
        className="confirm-button"
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
      >
        예매 완료
      </button>
    </div>
  );
};

export default Booking;
