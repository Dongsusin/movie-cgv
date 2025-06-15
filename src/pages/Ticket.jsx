import React from "react";
import "./Ticket.css";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const navigate = useNavigate();
  const ticketData = localStorage.getItem("ticket");
  const ticket = ticketData ? JSON.parse(ticketData) : null;

  const handleCancel = () => {
    localStorage.removeItem("ticket");
    navigate("/");
  };

  if (!ticket) return <div>예매된 티켓이 없습니다.</div>;

  return (
    <div className="ticket-container">
      <h2>예매 티켓</h2>
      <div className="ticket">
        <h3>{ticket.movieTitle}</h3>
        <p>날짜: {ticket.date || "선택되지 않음"}</p>
        <p>시간: {ticket.time || "선택되지 않음"}</p>
        <p>좌석: {ticket.seats.join(", ")}</p>
        <button className="cancel-button" onClick={handleCancel}>
          예매 취소
        </button>
      </div>
    </div>
  );
};

export default Ticket;