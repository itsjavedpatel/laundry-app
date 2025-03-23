const mongoose = require("mongoose");
const axios = require("axios");
const { useState } = require("react");
const AddStudent = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentId, setStudentId] = useState("");
  const [laundryId, setLaundryId] = useState
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/", {
        userName,
        email,
        mobile,
        studentId,
        laundryId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          name="userName"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="mobile">Mobile number:</label>
        <input
          type="text"
          name="mobile"
          required
          onChange={(e) => setMobile(e.target.value)}
        />
        <label htmlFor="studentId">StudentId:</label>
        <input
          type="text"
          name="studentID"
          required
          onChange={(e) => setStudentId(e.target.value)}
        />
        <label htmlFor="laundryId">laundryId:</label>
        <input
          type="text"
          name="laundryId"
          required
          onChange={(e) => setLaundryId(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};
export default AddStudent;
