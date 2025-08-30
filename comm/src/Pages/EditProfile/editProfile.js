import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ fullName: "", email: "", phone: "" });
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // ✅ Reuse fetchWithAuth
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
            const newToken = await refreshAccessToken();
            res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                },
            });
        }

        return res;
    };

    // ✅ Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetchWithAuth("http://localhost:5000/api/user/me");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load profile");

                setUser({
                    fullName: data.user.fullName || "",
                    email: data.user.email || "",
                    phone: data.user.phone || "",
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
                setErrorMsg(err.message);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // ✅ Handle profile update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const res = await fetchWithAuth("http://localhost:5000/api/user/update-profile", {
                method: "PUT",
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update profile");

            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => navigate("/account"), 1200); // redirect back
        } catch (err) {
            console.error("Update error:", err);
            setErrorMsg(err.message);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>

            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            {successMsg && <p className="success-msg">{successMsg}</p>}

            <form onSubmit={handleSubmit} className="edit-profile-form">
                <label>
                    Full Name:
                    <input
                        type="text"
                        value={user.fullName}
                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                </label>

                <div className="btn-group">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate("/account")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
