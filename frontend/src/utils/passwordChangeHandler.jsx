import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const handlePasswordChange = async (passwordForm) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/student/update-password",
      { passwordForm },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message);
    localStorage.removeItem("token");
    setOtpSent(false);
    navigate("/");
  } catch (error) {
    console.log(error);
    if (error.response) toast.error(error.response.data.message);
    else {
      toast.error("Something went wrong");
    }
    localStorage.removeItem("token");
  }
};

export { handlePasswordChange };
