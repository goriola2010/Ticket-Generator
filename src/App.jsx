import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    conference: "",
    date: "",
    seat: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const ticketRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleDownload = () => {
    const element = ticketRef.current;
    if (!element) return;

    // Fix for font, background and dimensions
    html2canvas(element, {
      scale: 2, // higher resolution
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="container">
      <h1>🎟️ Conference Ticket Generator</h1>

      {!isSubmitted && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="conference"
            placeholder="Conference Name"
            onChange={handleChange}
            required
          />
          <input name="date" type="date" onChange={handleChange} required />
          <input
            name="seat"
            placeholder="Seat Number"
            onChange={handleChange}
            required
          />
          <button type="submit">Generate Ticket</button>
        </form>
      )}

      {isSubmitted && (
        <>
          <p className="success-message">
            ✅ Ticket successfully generated! 🎉
          </p>
          <div className="ticket" ref={ticketRef}>
            <h2>{form.conference}</h2>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Date:</strong> {form.date}
            </p>
            <p>
              <strong>Seat:</strong> {form.seat}
            </p>
            <p className="barcode">||| ||| | || ||||</p>
          </div>
          <button onClick={handleDownload} style={{ marginTop: "1rem" }}>
            Download Ticket as Image
          </button>
        </>
      )}
    </div>
  );
}

export default App;
