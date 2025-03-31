import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const logoutHandler = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:3000/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    return true;
  } catch (error) {
    toast.error(response.data.message);
    return false;
  }
};
export default logoutHandler;
