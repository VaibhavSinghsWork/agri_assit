import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response =
                await loginUser(formData);

            login(
                response.user,
                response.token
            );

            const destination =
                location.state?.from || "/";

            navigate(destination);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <section className="auth-card">

                <div className="auth-brand">
                    <div className="auth-brand-icon">
                        A
                    </div>

                    <span>
                        Agri Assist
                    </span>
                </div>

                <div className="auth-heading">

                    <p className="section-label">
                        WELCOME BACK
                    </p>

                    <h1>
                        Login to your account
                    </h1>

                    <p>
                        Access your farming tools and
                        agricultural information.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>

                <div className="auth-divider">
                    <span></span>
                    <p>New to Agri Assist?</p>
                    <span></span>
                </div>

                <Link
                    to="/signup"
                    className="auth-secondary-button"
                >
                    Create an account
                </Link>

                <p className="auth-note">
                    Your account allows you to access
                    protected farming tools.
                </p>

            </section>

        </div>
    );
}

export default Login;