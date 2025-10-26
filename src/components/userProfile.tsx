import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface UserProfileData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      console.log("Fetching user with ID:", userId);
      try {
        const res = await fetch(`http://localhost:8080/user/${userId}`);
        const data = await res.json();
        console.log("Fetched user data:", data);
        setUser(data[0]);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }
  if (!userId) {
    navigate("/login");
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>

      <div className="space-y-4">
        <div className="mb-3">
          <span className="block font-medium text-gray-600">Name: </span>
          <span>{user.name}</span>
        </div>

        <div className="mb-3">
          <span className="block font-medium text-gray-600">Email: </span>
          <span>{user.email}</span>
        </div>

        <div className="mb-3">
          <span className="block font-medium text-gray-600">Role: </span>
          <span>{user.role}</span>
        </div>

        <div className="mb-3">
          <span className="block font-medium text-gray-600">Phone: </span>
          <span>{user.phone}</span>
        </div>

        {user.createdAt && (
          <div className="mb-3">
            <span className="block font-medium text-gray-600">Created At: </span>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
        )}

        {user.updatedAt && (
          <div className="mb-3">
            <span className="block font-medium text-gray-600 ">Updated At: </span>
            <span>{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
