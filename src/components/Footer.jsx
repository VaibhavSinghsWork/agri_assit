import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-brand">

                    <h3>
                        Agri Assist
                    </h3>

                    <p>
                        A simple agricultural assistance
                        platform designed to bring useful
                        farming tools and information
                        together in one place.
                    </p>

                </div>

                <div className="footer-info">

                    <h4>
                        Farming Tools
                    </h4>

                    <p>
                        <Link to="/fertilizer">
                            Fertilizer Calculator
                        </Link>
                    </p>

                    <p>
                        <Link to="/mandi">
                            Mandi Prices
                        </Link>
                    </p>

                    <p>
                        <Link to="/irrigation">
                            Irrigation Guide
                        </Link>
                    </p>

                </div>

                <div className="footer-info">

                    <h4>
                        Project
                    </h4>

                    <p>
                        MERN Stack
                    </p>

                    <p>
                        Agricultural Assistance Platform
                    </p>

                    <p>
                        College Project
                    </p>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 Agri Assist. College Project.
                </p>

            </div>

        </footer>
    );
}

export default Footer;