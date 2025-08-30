import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./accountPage.css";

const AccountPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchWithAuth = async (url, options = {}) => {
        let token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const refreshAccessToken = async () => {
            const refreshRes = await fetch("http://localhost:5000/api/user/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshRes.ok) {
                const { accessToken } = await refreshRes.json();
                localStorage.setItem("accessToken", accessToken);
                return accessToken;
            } else {
                throw new Error("Session expired, please login again.");
            }
        };

        if (!token && refreshToken) {
            token = await refreshAccessToken();
        }

        let res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (res.status === 401 && refreshToken) {
            try {
                const newToken = await refreshAccessToken();
                res = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${newToken}`,
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                throw err;
            }
        }

        return res;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetchWithAuth("http://localhost:5000/api/user/me");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load account");
                }

                setUser(data.user);
                setAddresses(data.user.addresses || []);
            } catch (error) {
                console.error("Error fetching account data:", error);
                setErrorMsg(error.message);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/user/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
            });
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("UserId");
            navigate("/login");
        }
    };

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    // ✅ Delete address handler
    const handleDeleteAddress = async (id) => {
        try {
            const res = await fetchWithAuth(`http://localhost:5000/api/user/address/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete address");

            setAddresses((prev) => prev.filter((addr) => addr._id !== id));
        } catch (err) {
            console.error("Delete address error:", err);
            alert("Could not delete address. Please try again.");
        }
    };

    // ✅ Edit address handler
    const handleEditAddress = (id) => {
        navigate(`/edit-address/${id}`);
    };

    if (loading) return <p>Loading account details...</p>;
    if (errorMsg) return <p className="error-msg">{errorMsg}</p>;

    return (
        <div className="account-container">
            <h2>My Account</h2>

            {user && (
                <div className="account-details">
                    <p><strong>Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <Button className="edit-btn" onClick={handleEditProfile}>
                        Edit Profile
                    </Button>
                </div>
            )}

            <div className="order-history">
                <h3>Order History</h3>
                <p>No orders yet.</p>
            </div>

            <div className="addressSection">
                <h3>My Addresses</h3>

                {addresses.length > 0 ? (
                    <div className="addressList">
                        {addresses.map((addr) => (
                            <div key={addr._id} className="addressCard">
                                <div className="addressInfo">
                                    <p><b>{addr.fullName}</b> ({addr.phone})</p>
                                    <p>{addr.street}, {addr.city}, {addr.state}</p>
                                    <p>{addr.pincode}, {addr.country}</p>
                                </div>
                                <div className="addressActions">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            aria-label="edit"
                                            // onClick={() => handleEditAddress(addr._id)}
                                            onClick={() => navigate(`/edit-address/${addr._id}`)}
                                            className="edit-address-btn"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDeleteAddress(addr._id)}
                                            className="delete-btn"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No saved addresses yet.</p>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/add-address")}
                >
                    Add New Address
                </Button>
            </div>

            <Button className="logout-btn" onClick={handleLogout} variant="outlined" color="secondary">
                Logout
            </Button>
        </div>
    );
};

export default AccountPage;
