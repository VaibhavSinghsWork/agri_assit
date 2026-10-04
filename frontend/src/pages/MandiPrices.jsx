
import React, { useMemo, useState } from "react";
import axios from "axios";
import "./MandiPrices.css";

const MandiPrices = () => {
    const [crop, setCrop] = useState("Wheat");
    const [state, setState] = useState("Maharashtra");
    const [selectedMandi, setSelectedMandi] = useState("All Mandis");

    // New state for mandi search
    const [mandiSearch, setMandiSearch] = useState("");
    const [showMandiSuggestions, setShowMandiSuggestions] =
        useState(false);

    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const crops = [
        "Wheat",
        "Rice",
        "Basmati Rice",
        "Maize",
        "Cotton",
        "Soyabean",
        "Onion",
        "Potato",
        "Tomato"
    ];

    const states = [
        "Maharashtra",
        "Gujarat",
        "Madhya Pradesh",
        "Rajasthan",
        "Karnataka",
        "Uttar Pradesh",
        "Punjab",
        "Haryana"
    ];

    // Get unique mandi names from API results
    const mandis = useMemo(() => {
        const uniqueMandis = [
            ...new Set(
                prices
                    .map((item) => item.market?.trim())
                    .filter(Boolean)
            )
        ];

        return ["All Mandis", ...uniqueMandis];
    }, [prices]);

    // Search/filter mandi suggestions
    const filteredMandis = useMemo(() => {
        const search = mandiSearch.trim().toLowerCase();

        // If nothing is typed, show all mandis except All Mandis
        if (!search) {
            return mandis.filter(
                (mandi) => mandi !== "All Mandis"
            );
        }

        return mandis.filter(
            (mandi) =>
                mandi !== "All Mandis" &&
                mandi.toLowerCase().startsWith(search)
        );
    }, [mandis, mandiSearch]);

    // Filter prices according to selected mandi
    const filteredPrices = useMemo(() => {
        if (selectedMandi === "All Mandis") {
            return prices;
        }

        return prices.filter(
            (item) =>
                item.market?.trim() === selectedMandi
        );
    }, [prices, selectedMandi]);

    const fetchPrices = async () => {
        setLoading(true);
        setError("");
        setPrices([]);
        setSelectedMandi("All Mandis");

        // Reset mandi search
        setMandiSearch("");
        setShowMandiSuggestions(false);

        try {
            const response = await axios.get(
                "http://localhost:5000/api/mandi/prices",
                {
                    params: {
                        crop,
                        location: state
                    }
                }
            );

            console.log(
                "Mandi API Response:",
                response.data
            );

            const receivedPrices =
                response.data?.data || [];

            console.log(
                "Number of price records:",
                receivedPrices.length
            );

            setPrices(receivedPrices);

        } catch (err) {
            console.error(
                "Mandi Price Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to fetch mandi prices. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    // Select a mandi from suggestions
    const handleMandiSelect = (mandi) => {
        setSelectedMandi(mandi);
        setMandiSearch(mandi);
        setShowMandiSuggestions(false);
    };

    // Handle typing in mandi search box
    const handleMandiSearch = (e) => {
        setMandiSearch(e.target.value);
        setShowMandiSuggestions(true);

        // If search box is cleared, show all mandis
        if (e.target.value.trim() === "") {
            setSelectedMandi("All Mandis");
        }
    };

    return (
        <div className="mandi-page">

            {/* HERO */}
            <section className="mandi-hero">
                <div className="mandi-hero-content">

                    <span className="mandi-badge">
                        🌾 AGRI ASSIST
                    </span>

                    <h1>Mandi Prices</h1>

                    <p>
                        Check the latest available market
                        prices for your crop across mandis.
                    </p>

                </div>
            </section>


            {/* SEARCH SECTION */}
            <section className="mandi-search-section">

                <div className="mandi-search-card">

                    <h2>Find Market Prices</h2>

                    <p className="search-description">
                        Select your crop and state to find
                        prices from different mandis.
                    </p>


                    {/* CROP + STATE */}
                    <div className="mandi-form">

                        <div className="mandi-input-group">

                            <label>
                                Select Crop
                            </label>

                            <select
                                value={crop}
                                onChange={(e) =>
                                    setCrop(e.target.value)
                                }
                            >

                                {crops.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                        </div>


                        <div className="mandi-input-group">

                            <label>
                                Select State
                            </label>

                            <select
                                value={state}
                                onChange={(e) =>
                                    setState(e.target.value)
                                }
                            >

                                {states.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                        </div>


                        <button
                            className="mandi-search-button"
                            onClick={fetchPrices}
                            disabled={loading}
                        >

                            {loading
                                ? "Fetching Prices..."
                                : "Check Prices"}

                        </button>

                    </div>


                    {/* MANDI SELECTOR */}
                    {prices.length > 0 && (

                        <div className="mandi-selector">

                            <div className="mandi-selector-header">

                                <div>

                                    <label>
                                        Select Mandi
                                    </label>

                                    <p>
                                        Search or choose a mandi
                                        to view its prices
                                    </p>

                                </div>

                                <span className="mandi-count">
                                    {mandis.length - 1} mandis
                                </span>

                            </div>


                            {/* SEARCHABLE MANDI INPUT */}
                            <div className="mandi-search-wrapper">

                                <input
                                    type="text"
                                    className="mandi-search-input"
                                    placeholder="🔍 Search mandi..."
                                    value={mandiSearch}
                                    onChange={handleMandiSearch}
                                    onFocus={() =>
                                        setShowMandiSuggestions(true)
                                    }
                                    autoComplete="off"
                                />


                                {/* SUGGESTIONS */}
                                {showMandiSuggestions && (
                                    <div className="mandi-suggestions">

                                        {/* ALL MANDIS */}
                                        <div
                                            className={`mandi-suggestion ${
                                                selectedMandi ===
                                                "All Mandis"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onMouseDown={() => {
                                                setSelectedMandi(
                                                    "All Mandis"
                                                );
                                                setMandiSearch("");
                                                setShowMandiSuggestions(
                                                    false
                                                );
                                            }}
                                        >
                                            All Mandis
                                        </div>


                                        {/* FILTERED MANDIS */}
                                        {filteredMandis.length > 0 ? (

                                            filteredMandis.map(
                                                (mandi) => (
                                                    <div
                                                        key={mandi}
                                                        className={`mandi-suggestion ${
                                                            selectedMandi ===
                                                            mandi
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        onMouseDown={() =>
                                                            handleMandiSelect(
                                                                mandi
                                                            )
                                                        }
                                                    >
                                                        {mandi}
                                                    </div>
                                                )
                                            )

                                        ) : (

                                            <div className="no-mandi-found">
                                                No mandi found
                                            </div>

                                        )}

                                    </div>
                                )}

                            </div>

                        </div>

                    )}

                </div>

            </section>


            {/* ERROR */}
            {error && (

                <div className="mandi-error">
                    {error}
                </div>

            )}


            {/* RESULTS */}
            {filteredPrices.length > 0 && (

                <section className="mandi-results">

                    <div className="results-heading">

                        <div>

                            <span className="results-label">
                                MARKET INFORMATION
                            </span>

                            <h2>
                                {crop} Prices

                                {selectedMandi !==
                                    "All Mandis"
                                    ? ` at ${selectedMandi}`
                                    : ` in ${state}`}
                            </h2>

                        </div>


                        <span className="result-count">
                            {filteredPrices.length} records
                        </span>

                    </div>


                    <div className="mandi-grid">

                        {filteredPrices.map(
                            (item, index) => (

                                <div
                                    className="mandi-price-card"
                                    key={index}
                                >

                                    <div className="market-header">

                                        <div className="market-icon">
                                            🏪
                                        </div>

                                        <div>

                                            <h3>
                                                {item.market}
                                            </h3>

                                            <span>
                                                {item.variety}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="price-section">

                                        <div className="price-box">

                                            <span>
                                                Minimum
                                            </span>

                                            <strong>
                                                ₹{item.min_price}
                                            </strong>

                                        </div>


                                        <div className="price-box modal-price">

                                            <span>
                                                Modal
                                            </span>

                                            <strong>
                                                ₹{item.modal_price}
                                            </strong>

                                        </div>


                                        <div className="price-box">

                                            <span>
                                                Maximum
                                            </span>

                                            <strong>
                                                ₹{item.max_price}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="market-info">

                                        <div>

                                            <span>
                                                📅 Market Date
                                            </span>

                                            <strong>
                                                {item.arrival_date}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </section>

            )}


            {/* NO RESULTS */}
            {!loading &&
                !error &&
                prices.length > 0 &&
                filteredPrices.length === 0 && (

                    <section className="mandi-empty">

                        <div className="empty-icon">
                            🌾
                        </div>

                        <h2>
                            No prices found
                        </h2>

                        <p>
                            No price records are currently
                            available for this mandi.
                        </p>

                    </section>

                )}


            {/* INITIAL STATE */}
            {!loading &&
                !error &&
                prices.length === 0 && (

                    <section className="mandi-empty">

                        <div className="empty-icon">
                            🌾
                        </div>

                        <h2>
                            Check Today's Mandi Prices
                        </h2>

                        <p>
                            Select a crop and state above
                            and click Check Prices.
                        </p>

                    </section>

                )}


            {/* INFORMATION */}
            <section className="mandi-info">

                <div className="info-icon">
                    ℹ️
                </div>

                <div>

                    <h3>
                        About these prices
                    </h3>

                    <p>
                        Prices displayed here are obtained
                        from Agmarknet and represent available
                        market information. Actual prices may
                        vary depending on market, variety,
                        quality and market conditions.
                    </p>

                </div>

            </section>

        </div>
    );
};

export default MandiPrices;

