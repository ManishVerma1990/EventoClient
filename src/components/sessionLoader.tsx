// App.tsx or a dedicated SessionLoader.tsx
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess, logout } from "../store/userSlice";

const SessionLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/me", {
          withCredentials: true, // important: send session cookie
        });
        if (res.data.user) {
          dispatch(loginSuccess(res.data.user)); // restore Redux state
        } else {
          dispatch(logout()); // no session
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, []);

  return null; // this component doesn’t render anything
};

export default SessionLoader;
