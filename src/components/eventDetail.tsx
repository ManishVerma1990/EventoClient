import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../store/hooks"; // assuming Redux setup
import type { User } from "../store/userSlice";

interface Event {
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  category: string;
  status: string;
  address: string;
  organizerId: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const randomImages = [
    // "https://picsum.photos/600/400?random=1",
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=3",
    // "https://picsum.photos/600/400?random=4",
    // "https://picsum.photos/600/400?random=5",
    "/images/aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg",
    "/images/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg",
    "/images/chuttersnap-Q_KdjKxntH8-unsplash.jpg",
    "/images/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg",
    "/images/fidel-fernando-249DzAuJTqQ-unsplash.jpg",
    "/images/noiseporn-JNuKyKXLh8U-unsplash.jpg",
    "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg",
    "/images/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg",
    "/images/photos-by-lanty-O38Id_cyV4M-unsplash.jpg",
    "/images/stem-list-EVgsAbL51Rk-unsplash.jpg",
    "/images/the-climate-reality-project-Hb6uWq0i4MI-unsplash.jpg",
  ];

  const navigate = useNavigate();
  const user: User | null = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/event/${id}`);
        console.log("Fetched event:", res.data); // check here
        const data = res.data[0];
        setEvent(data); // map id
      } catch (err) {
        console.error(err);
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  const handleRegister = async (eventId: string) => {
    // const user: User | null = useAppSelector((state) => state.user.user);
    const userId = user?.userId;
    console.log("register");
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

  // const handleUpdate = () => {
  //   navigate(`/event/update/${id}`);
  // };

  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete this event?")) return;
  //   try {
  //     await axios.delete(`http://localhost:8080/event/${id}`, {
  //       withCredentials: true,
  //     });
  //     alert("Event deleted successfully!");
  //     navigate("/events"); // redirect to events list
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete event.");
  //   }
  // };

  const getPaticipants = () => {
    navigate(`/event/${id}/participants`);
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!event) return <p className="text-center mt-5">Event not found</p>;

  const imageUrl = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;

  const isOwner = user?.userId === event.organizerId;

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ maxWidth: "700px", width: "100%" }}>
        <img src={randomImages[Math.floor(Math.random() * 10)]} className="card-img-top" alt="Event" />
        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          <p className="card-text">{event.description}</p>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Category:</strong> {event.category}
            </li>
            {/* <li className="list-group-item">
              <strong>Status:</strong>{" "}
              <span className={event.status?.toLowerCase() === "active" ? "text-success" : "text-secondary"}>{event.status}</span>
            </li> */}
            <li className="list-group-item">
              <strong>Address:</strong> {event.address}
            </li>
            <li className="list-group-item">
              <strong>Start:</strong> {formatDate(event.startTime)}
            </li>
            <li className="list-group-item">
              <strong>End:</strong> {formatDate(event.endTime)}
            </li>
            <li className="list-group-item">
              <strong>Capacity:</strong> {event.capacity}
            </li>
            <li className="list-group-item">
              <strong>Price:</strong> ${event.price}
            </li>
          </ul>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-primary" onClick={() => handleRegister(event.eventId)}>
              Register
            </button>

            {/* {isOwner && (
              <>
                <button className="btn btn-warning" onClick={handleUpdate}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )} */}
            {isOwner && (
              <>
                <button className="btn btn-warning" onClick={getPaticipants}>
                  participants
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
