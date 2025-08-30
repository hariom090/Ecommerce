import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../Context/authContext";

const Login = () => {
    const navigate = useNavigate();
    const { login, isLoggedIn } = useContext(AuthContext); // ✅ use AuthContext

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // ✅ Redirect if user is already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // or navigate("/") depending on your flow
        }
    }, [isLoggedIn, navigate]);

    const validateForm = () => {
        const { email, password } = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMsg("Please enter a valid email address");
            return false;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long");
            return false;
        }

        setErrorMsg("");
        return true;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                setErrorMsg(data.message || "Invalid email or password");
                return;
            }

            // ✅ Call AuthContext login
            login(data.accessToken, data.refreshToken , data.user.id);

            setErrorMsg("");
            navigate("/"); 
        } catch (error) {
            console.error("Login error:", error);
            setErrorMsg("Server not reachable. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-page">
            <div className="form-container">
                <h2>Login</h2>
                
                {errorMsg && <p className="error-message">{errorMsg}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn" 
                        disabled={loading || !formData.email || !formData.password}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/create-account">Create one</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
