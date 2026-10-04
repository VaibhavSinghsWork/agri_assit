import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import FertilizerCalculator from "./pages/Fertilizer";
import MandiPrices from "./pages/MandiPrices";
import Irrigation from "./pages/Irrigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>

            <ScrollToTop />

                <Navbar />

                <main>
                    <Routes>

                        {/* Public Pages */}

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/signup"
                            element={<Signup />}
                        />


                        {/* Protected Pages */}

                        <Route
                            path="/fertilizer"
                            element={
                                //<ProtectedRoute>
                                    <FertilizerCalculator />
                                //</ProtectedRoute>
                            }
                        />

                         <Route
                            path="/mandi-prices"
                            element={<MandiPrices />}
                        />
                        

                        <Route
                            path="/irrigation"
                            element={
                              //  <ProtectedRoute>
                                    <Irrigation />
                                //</ProtectedRoute>
                            }
                        />

                    </Routes>
                </main>

                <Footer />

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;