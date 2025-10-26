import React, { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks"; // assuming Redux setup
import type { User } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const NewEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    startTime: "",
    endTime: "",
    capacity: "",
    price: "",
    status: "upcoming",
  });

  const [message, setMessage] = useState("");
  const user: User | null = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/event/new", {
        ...formData,
        organizerId: user?.userId,
        capacity: Number(formData.capacity),
        price: Number(formData.price),
      });

      setMessage("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        address: "",
        startTime: "",
        endTime: "",
        capacity: "",
        price: "",
        status: "upcoming",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Create New Event</h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            maxLength={45}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>

        {/* Start Time */}
        <div className="mb-3">
          <label className="form-label">Start Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time */}
        <div className="mb-3">
          <label className="form-label">End Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Capacity */}
        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input type="number" className="form-control" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Event
        </button>
      </form>

      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default NewEvent;
