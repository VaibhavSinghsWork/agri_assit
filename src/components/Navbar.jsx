
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const {
        user,
        logout,
        isLoggedIn
    } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <div className="navbar-logo">
                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Agri Assist
                    </Link>
                </div>

                <button
                    className="menu-button"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div
                    className={`navbar-links ${
                        menuOpen
                            ? "navbar-links-open"
                            : ""
                    }`}
                >

                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>

                    <Link
                        to="/fertilizer"
                        onClick={closeMenu}
                    >
                        Fertilizer
                    </Link>

                    <Link
                        to="/mandi-prices"
                        onClick={closeMenu}
                    >
                        Mandi Prices
                    </Link>

                    <Link
                        to="/irrigation"
                        onClick={closeMenu}
                    >
                        Irrigation
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <span className="navbar-user">
                                Welcome, {user.name}
                            </span>

                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                onClick={closeMenu}
                            >
                                Signup
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;


