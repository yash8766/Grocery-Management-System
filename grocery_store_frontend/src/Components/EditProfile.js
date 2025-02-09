import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from the URL
  
    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
        navigate("/customer");
      } else if (sessionStorage.getItem("userRole") === "ADMIN") {
        navigate("/admin");
      }
    }, [navigate]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState(""); // New state for password

  const editUrl = `http://localhost:8080/customer/getUserById/${id}`;
  const updateUrl = `http://localhost:8080/customer/updateUser/${id}`;

  // Fetch user details when the component mounts
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { userName, email, contact, pincode, address, password } = response.data;
        setUserName(userName || "");
        setEmail(email || "");
        setContact(contact || "");
        setPincode(pincode || "");
        setAddress(address || "");
        setPassword(password || "")
      })
      .catch((error) => {
        console.error("Error occurred getting user details:", error);
        toast.error("Failed to fetch user details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    // Prepare updated user details
    const userDetails = {
      userName,
      email,
      contact,
      pincode,
      address,
      password, // Include password in the update request
    };

    axios
      .put(updateUrl, userDetails, config) // Include config in the PUT request
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to profile page after success
        }, 2000); // Delay to show toast
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            marginTop:"25rem",
            border: "2px solid rgb(194, 239, 195)",
            backgroundColor: "#f4f4f9",
            color: "black",
          }}
        >
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* User Name */}
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                pattern="\d{6}"
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ height: "80px" }}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
