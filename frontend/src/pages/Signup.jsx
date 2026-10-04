import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import { signupUser } from "../services/authService";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        setError("");

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError(
                "Passwords do not match."
            );

            return;
        }

        try {
            setLoading(true);

            await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Signup failed. Please try again."
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
                        GET STARTED
                    </p>

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Create an account to access
                        Agri Assist farming tools.
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
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                            required
                        />

                    </div>

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
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength="6"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            minLength="6"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </button>

                </form>

                <div className="auth-divider">
                    <span></span>
                    <p>Already have an account?</p>
                    <span></span>
                </div>

                <Link
                    to="/login"
                    className="auth-secondary-button"
                >
                    Login
                </Link>

                <p className="auth-note">
                    By creating an account, you can
                    access protected Agri Assist tools.
                </p>

            </section>

        </div>
    );
}

export default Signup;