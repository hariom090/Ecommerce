import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./addAddress.css";

const AddAddress = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("UserId");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Address added successfully!");
        navigate("/account"); // go back to account page
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add address");
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  return (
    <section className="addAddress container">
      <h2>Add New Address</h2>
      <form onSubmit={handleSubmit} className="addressForm">
        <TextField name="fullName" label="Full Name" value={form.fullName} onChange={handleChange} required />
        <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} required />
        <TextField name="street" label="Street" value={form.street} onChange={handleChange} required />
        <TextField name="city" label="City" value={form.city} onChange={handleChange} required />
        <TextField name="state" label="State" value={form.state} onChange={handleChange} required />
        <TextField name="pincode" label="Pincode" value={form.pincode} onChange={handleChange} required />
        <TextField name="country" label="Country" value={form.country} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="success">Save Address</Button>
      </form>
    </section>
  );
};

export default AddAddress;
