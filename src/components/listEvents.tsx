import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // assuming Redux setup
import type { User } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

// Define event type
interface Event {
  eventId: string; // optional if API doesn't return id
  title: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
}

// Random images for events
const randomImages = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
];

const ListEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("All Events");

  const { id: organizerId } = useParams<{ id: string }>();
  const { userId: userId } = useParams<{ userId: string }>();

  const user: User | null = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleRegister = async (eventId: string) => {
    const userId = user?.userId;
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/registration/new`,
        { eventId, userId, regType: "audience", checkIn: false, paymentStatus: "paid" },
        { withCredentials: true }
      );
      alert("Registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to register.");
    }
  };

  useEffect(() => {
    const pageUrl = window.location.href;
    if (pageUrl.includes("/event/organizer/")) {
      setTitle("Events by Organizer");
    } else if (pageUrl.includes("/registration/event/")) {
      setTitle("Your Registered Events");
    } else {
      setTitle("All Events");
    }

    const fetchEvents = async () => {
      if (organizerId) {
        try {
          const res = await axios.get<Event[]>(`http://localhost:8080/event/organizer/${organizerId}`);
          setEvents(res.data);
        } catch (err) {
          setError("Failed to fetch events for organizer");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else if (userId) {
        try {
          const res = await axios.get<Event[]>(`http://localhost:8080/registration/user/${userId}`);
          setEvents(res.data);
        } catch (err) {
          setError("Failed to fetch registered events for user");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const res = await axios.get<Event[]>("http://localhost:8080/event");
          setEvents(res.data);
        } catch (err) {
          setError("Failed to fetch events");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEvents();
  }, [organizerId]);

  if (loading) return <p className="text-center mt-5">Loading events...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="title">{title}</h1>
      <div className="row g-4">
        {events.map((event, index) => (
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Link to={`/event/${event.eventId}`}>
                <img
                  src={randomImages[index % randomImages.length]}
                  className="card-img-top"
                  alt="Event"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <Link to={`/event/${event.eventId}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h5 className="card-title">{event.title}</h5>
                </Link>
                <p className="card-text mb-1">
                  <strong>Start:</strong> {new Date(event.startTime).toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  <strong>Capacity:</strong> {event.capacity}
                </p>
                <p className="card-text mb-3">
                  <strong>Price:</strong> ${event.price}
                </p>
                <button className="btn btn-primary mt-auto" onClick={async () => handleRegister(event.eventId)}>
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEvents;
