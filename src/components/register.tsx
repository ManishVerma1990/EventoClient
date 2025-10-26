import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        ...formData,
        phone: Number(formData.phone),
      });
      setMessage("Registration successful!");
      console.log(response.data);
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">User Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="number" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default Register;
