import { useState } from "react";
import { getBookings, removeBooking } from "../utils/storage.js";

const fmtDate = (s) => new Date(s + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

export default function MyBookings() {
  const [bookings, setBookings] = useState(getBookings());
  const cancel = (id) => { removeBooking(id); setBookings(getBookings()); };

  return (
    <main className="page">
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p className="muted">You have no bookings yet. Find a restaurant to reserve a table.</p>}
      <div className="r-list">
        {bookings.map((b) => (
          <div className="r-card" key={b.bookingId}>
            <div className="r-row">
              <div className="r-img">🍴</div>
              <div className="r-info">
                <h3>{b.name || b.restaurantName || b["Restaurant Name"]}</h3>
                <p className="muted">{b.address}</p>
                <p className="muted">{b.city}, {b.state}</p>
                <span className="rating">★ {b.rating}</span>
              </div>
              <div className="r-action">
                <span className="chip">{b.bookingTime}</span>
                <span className="chip date">{fmtDate(b.bookingDate)}</span>
                <button type="button" className="btn ghost" onClick={() => cancel(b.bookingId)}>Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
