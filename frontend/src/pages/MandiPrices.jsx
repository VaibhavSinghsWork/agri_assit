
import React, { useMemo, useState } from "react";
import axios from "axios";
import crops from "../data/crops";
import "./MandiPrices.css";

const MandiPrices = () => {
    const [crop, setCrop] = useState("Wheat");
    const [state, setState] = useState("Maharashtra");
    const [selectedMandi, setSelectedMandi] = useState("All Mandis");

    const [mandiSearch, setMandiSearch] = useState("");
    const [showMandiSuggestions, setShowMandiSuggestions] = useState(false);

    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

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

    // Filter mandi suggestions based on search
    const filteredMandis = useMemo(() => {
        const search = mandiSearch.trim().toLowerCase();

        return mandis.filter((mandi) => {
            if (mandi === "All Mandis") return false;
            return mandi.toLowerCase().startsWith(search);
        });
    }, [mandis, mandiSearch]);

    // Filter results by selected mandi
    const filteredPrices = useMemo(() => {
        if (selectedMandi === "All Mandis") {
            return prices;
        }

        return prices.filter(
            (item) => item.market?.trim() === selectedMandi
        );
    }, [prices, selectedMandi]);

    // Fetch mandi prices from backend
    const fetchPrices = async () => {
        setLoading(true);
        setError("");
        setPrices([]);
        setSelectedMandi("All Mandis");
        setMandiSearch("");
        setShowMandiSuggestions(false);
        setHasSearched(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            if (!apiUrl) {
                throw new Error(
                    "API URL is not configured. Please check VITE_API_URL."
                );
            }

            const response = await axios.get(
                `${apiUrl.replace(/\/+$/, "")}/api/mandi/prices`,
                {
                    params: {
                        crop,
                        location: state
                    },
                    timeout: 60000
                }
            );

            if (response.data?.success === false) {
                throw new Error(
                    response.data.message || "Unable to fetch mandi prices."
                );
            }

            const receivedPrices = Array.isArray(response.data?.data)
                ? response.data.data
                : [];

            setPrices(receivedPrices);

        } catch (err) {
            console.error("Mandi Price Error:", err);

            setPrices([]);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to fetch mandi prices. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleMandiSelect = (mandi) => {
        setSelectedMandi(mandi);
        setMandiSearch(mandi === "All Mandis" ? "" : mandi);
        setShowMandiSuggestions(false);
    };

    const handleMandiSearch = (e) => {
        const value = e.target.value;

        setMandiSearch(value);
        setShowMandiSuggestions(true);

        if (!value.trim()) {
            setSelectedMandi("All Mandis");
        } else {
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
                        Check the latest available market prices
                        for your crop across mandis.
                    </p>
                </div>
            </section>

            {/* SEARCH SECTION */}
            <section className="mandi-search-section">
                <div className="mandi-search-card">
                    <h2>Find Market Prices</h2>

                    <p className="search-description">
                        Select your crop and state to find prices
                        from different mandis.
                    </p>

                    <div className="mandi-form">
                        <div className="mandi-input-group">
                            <label htmlFor="mandi-crop">Select Crop</label>

                            <select
                                id="mandi-crop"
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                            >
                                {crops.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mandi-input-group">
                            <label htmlFor="mandi-state">Select State</label>

                            <select
                                id="mandi-state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                {states.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            className="mandi-search-button"
                            onClick={fetchPrices}
                            disabled={loading}
                        >
                            {loading ? "Fetching Prices..." : "Check Prices"}
                        </button>
                    </div>

                    {/* MANDI SELECTOR */}
                    {prices.length > 0 && (
                        <div className="mandi-selector">
                            <div className="mandi-selector-header">
                                <div>
                                    <label htmlFor="mandi-search">
                                        Select Mandi
                                    </label>

                                    <p>
                                        Search or choose a mandi to view its prices.
                                    </p>
                                </div>

                                <span className="mandi-count">
                                    {mandis.length - 1} mandis
                                </span>
                            </div>

                            <div className="mandi-search-wrapper">
                                <input
                                    id="mandi-search"
                                    type="text"
                                    className="mandi-search-input"
                                    placeholder="🔍 Search mandi..."
                                    value={mandiSearch}
                                    onChange={handleMandiSearch}
                                    onFocus={() => setShowMandiSuggestions(true)}
                                    onBlur={() => {
                                        setTimeout(
                                            () => setShowMandiSuggestions(false),
                                            150
                                        );
                                    }}
                                    autoComplete="off"
                                />

                                {showMandiSuggestions && (
                                    <div className="mandi-suggestions">
                                        <div
                                            className={`mandi-suggestion ${
                                                selectedMandi === "All Mandis"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onMouseDown={() =>
                                                handleMandiSelect("All Mandis")
                                            }
                                        >
                                            All Mandis
                                        </div>

                                        {filteredMandis.length > 0 ? (
                                            filteredMandis.map((mandi) => (
                                                <div
                                                    key={mandi}
                                                    className={`mandi-suggestion ${
                                                        selectedMandi === mandi
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onMouseDown={() =>
                                                        handleMandiSelect(mandi)
                                                    }
                                                >
                                                    {mandi}
                                                </div>
                                            ))
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
                <div className="mandi-error" role="alert">
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
                                {selectedMandi !== "All Mandis"
                                    ? ` at ${selectedMandi}`
                                    : ` in ${state}`}
                            </h2>
                        </div>

                        <span className="result-count">
                            {filteredPrices.length} records
                        </span>
                    </div>

                    <div className="mandi-grid">
                        {filteredPrices.map((item, index) => (
                            <div
                                className="mandi-price-card"
                                key={[
                                    item.state,
                                    item.district,
                                    item.market,
                                    item.commodity,
                                    item.variety,
                                    item.arrival_date,
                                    index
                                ].join("-")}
                            >
                                <div className="market-header">
                                    <div className="market-icon">🏪</div>

                                    <div>
                                        <h3>{item.market || "Market unavailable"}</h3>
                                        <span>{item.variety || "Variety unavailable"}</span>
                                    </div>
                                </div>

                                <div className="price-section">
                                    <div className="price-box">
                                        <span>Minimum</span>
                                        <strong>₹{item.min_price ?? "-"}</strong>
                                    </div>

                                    <div className="price-box modal-price">
                                        <span>Modal</span>
                                        <strong>₹{item.modal_price ?? "-"}</strong>
                                    </div>

                                    <div className="price-box">
                                        <span>Maximum</span>
                                        <strong>₹{item.max_price ?? "-"}</strong>
                                    </div>
                                </div>

                                <div className="market-info">
                                    <div>
                                        <span>📅 Market Date</span>
                                        <strong>{item.arrival_date || "-"}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && prices.length === 0 && (
                <section className="mandi-empty">
                    <div className="empty-icon">🌾</div>

                    <h2>
                        {hasSearched
                            ? "No prices found"
                            : "Check Mandi Prices"}
                    </h2>

                    <p>
                        {hasSearched
                            ? `No matching price records were returned for ${crop} in ${state}. Try another crop or state.`
                            : "Select a crop and state above, then click Check Prices."}
                    </p>
                </section>
            )}

            {/* NO RESULTS FOR SELECTED MANDI */}
            {!loading &&
                !error &&
                prices.length > 0 &&
                filteredPrices.length === 0 && (
                    <section className="mandi-empty">
                        <div className="empty-icon">🌾</div>

                        <h2>No prices found</h2>

                        <p>
                            No price records are currently available for this mandi.
                            Select All Mandis or search for another mandi.
                        </p>
                    </section>
                )}

            {/* INFORMATION */}
            <section className="mandi-info">
                <div className="info-icon">ℹ️</div>

                <div>
                    <h3>About these prices</h3>

                    <p>
                        Prices are retrieved from the data.gov.in daily mandi
                        price dataset. Availability depends on the records
                        provided by the source. Actual prices may vary by
                        market, variety, quality and date.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MandiPrices;
