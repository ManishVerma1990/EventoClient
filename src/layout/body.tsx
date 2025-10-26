import { Routes, Route } from "react-router-dom";
import ListEvents from "../components/listEvents";
import Login from "../components/login";
import EventDetail from "../components/eventDetail";
import Register from "../components/register";
import NewEvent from "../components/eventForm";
import ListParticipants from "../components/listParticipants";
import UserProfile from "../components/userProfile";

export default function Body() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<ListEvents />} />
        <Route path="/event/organizer/:id" element={<ListEvents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newEvent" element={<NewEvent />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/event/:id/participants" element={<ListParticipants />} />
        <Route path="/registration/event/:userId" element={<ListEvents />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </section>
  );
}
