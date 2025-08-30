import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAddress = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", phone: "", street: "", city: "",
    state: "", pincode: "", country: ""
  });

useEffect(() => {
  if (!addressId) return; // ⛔ don’t run if id missing

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok && data.user) {
        const addr = data.user.addresses.find(
          a => a?._id?.toString() === addressId?.toString()
        );
  
        if (addr) setForm(addr);
      } else {
        console.error("User not found or response not ok", data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchData();
}, [addressId]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");

  if (!token || !addressId) {
    alert("Missing required credentials or address ID");
    return;
  }

  console.log("Submitting update for:", { addressId, form });

  try {
    const res = await fetch(`http://localhost:5000/api/user/address/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // token already contains user info
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server responded with error:", data);
      alert(data.message || "Failed to update address");
      return;
    }

    alert("Address updated successfully");
    navigate("/account");
  } catch (err) {
    console.error("Network or parsing error:", err);
    alert("Something went wrong while updating the address");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <input name="street" value={form.street} onChange={handleChange} placeholder="Street" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
      <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
      <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
      <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditAddress;
