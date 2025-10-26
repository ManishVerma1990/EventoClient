import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Participant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate?: string;
};

const ListParticipants: React.FC = () => {
  const { id: eventId } = useParams<{ id: string }>(); // 👈 event ID from URL
  const [eventName, setEventName] = useState([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/event/${eventId}/participants`);
        console.log("Fetched participants:", response.data);
        setParticipants(response.data);
        const response2 = await axios.get(`http://localhost:8080/event/${eventId}`);
        setEventName(response2.data[0]?.title || "Event");
      } catch (err) {
        console.error(err);
        setError("Failed to load participants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchParticipants();
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading participants...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Participants for Event : {eventName}</h3>

      {participants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                {participants[0]?.registrationDate && <th>Registered On</th>}
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  {p.registrationDate && <td>{new Date(p.registrationDate).toLocaleString("en-IN")}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No participants registered yet.</p>
      )}
    </div>
  );
};

export default ListParticipants;
