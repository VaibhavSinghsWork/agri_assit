
const axios = require("axios");

const DATA_GOV_IN_BASE_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const PAGE_SIZE = 100;
const MAX_PAGES = 50;
const REQUEST_TIMEOUT = 30000;

const getMandiPrices = async (crop, location) => {
    try {
        // 1. Validate inputs
        if (typeof crop !== "string" || !crop.trim()) {
            throw new Error("Crop is required.");
        }

        if (typeof location !== "string" || !location.trim()) {
            throw new Error("State/location is required.");
        }

        // 2. Read API key from backend environment variables
        const apiKey = process.env.DATA_GOV_IN_API_KEY;

        if (!apiKey) {
            throw new Error(
                "DATA_GOV_IN_API_KEY is missing from environment variables."
            );
        }

        const selectedCrop = crop.trim();
        const selectedState = location.trim();

        console.log(
            `Fetching mandi prices | Crop: ${selectedCrop} | State: ${selectedState}`
        );

        const allRecords = [];
        let offset = 0;
        let totalRecords = Infinity;
        let pageCount = 0;

        // 3. Fetch all available pages for the selected state,
        // up to MAX_PAGES. Crop filtering is performed locally.
        while (offset < totalRecords && pageCount < MAX_PAGES) {
            const response = await axios.get(DATA_GOV_IN_BASE_URL, {
                params: {
                    "api-key": apiKey,
                    format: "json",
                    limit: PAGE_SIZE,
                    offset,
                    "filters[state.keyword]": selectedState
                },
                timeout: REQUEST_TIMEOUT
            });

            const apiData = response.data;

            if (!Array.isArray(apiData?.records)) {
                console.error(
                    "Unexpected data.gov.in response:",
                    apiData
                );

                throw new Error(
                    apiData?.message ||
                    "The mandi API returned an unexpected response."
                );
            }

            const pageRecords = apiData.records;

            if (pageCount === 0) {
                const reportedTotal = Number(apiData.total);

                totalRecords = Number.isFinite(reportedTotal)
                    ? reportedTotal
                    : pageRecords.length;

                console.log(
                    "API total records for state:",
                    totalRecords
                );
            }

            allRecords.push(...pageRecords);

            console.log(
                `Fetched ${pageRecords.length} records at offset ${offset}`
            );

            pageCount++;

            if (pageRecords.length === 0) {
                break;
            }

            offset += pageRecords.length;
        }

        if (pageCount >= MAX_PAGES && offset < totalRecords) {
            console.warn(
                `Reached the ${MAX_PAGES}-page limit. ` +
                "Some state records may not have been fetched."
            );
        }

        // 4. Filter locally by exact crop and state names
        const matchingRecords = allRecords.filter((item) => {
            const itemCrop = String(item.commodity || "")
                .trim()
                .toLowerCase();

            const itemState = String(item.state || "")
                .trim()
                .toLowerCase();

            return (
                itemCrop === selectedCrop.toLowerCase() &&
                itemState === selectedState.toLowerCase()
            );
        });

        // 5. Remove duplicate records
        const seen = new Set();

        const records = matchingRecords
            .filter((item) => {
                const key = [
                    item.state,
                    item.district,
                    item.market,
                    item.commodity,
                    item.variety,
                    item.grade,
                    item.arrival_date,
                    item.min_price,
                    item.max_price,
                    item.modal_price
                ]
                    .map((value) =>
                        String(value ?? "").trim().toLowerCase()
                    )
                    .join("|");

                if (seen.has(key)) {
                    return false;
                }

                seen.add(key);
                return true;
            })
            .map((item) => ({
                state: item.state || "-",
                district: item.district || "-",
                market: item.market || "-",
                commodity: item.commodity || selectedCrop,
                variety: item.variety || "-",
                grade: item.grade || "-",
                arrival_date: item.arrival_date || "-",
                min_price: item.min_price ?? "-",
                max_price: item.max_price ?? "-",
                modal_price: item.modal_price ?? "-"
            }));

        console.log(
            `Records fetched: ${allRecords.length} | ` +
            `Matching ${selectedCrop}: ${records.length}`
        );

        if (records.length === 0) {
            console.warn(
                `No matching records found for ${selectedCrop} ` +
                `in ${selectedState} within the fetched pages.`
            );
        }

        return records;
    } catch (error) {
        console.error(
            "data.gov.in API Error:",
            error.response?.data || error.message
        );

        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Unable to fetch mandi prices."
        );
    }
};

module.exports = {
    getMandiPrices
};
