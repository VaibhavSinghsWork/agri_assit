const axios = require("axios");

const AGMARKNET_BASE_URL =
    "https://api.agmarknet.gov.in/v1";

const getHeaders = () => ({
    Accept: "application/json, text/plain, */*",
    Origin: "https://agmarknet.gov.in",
    Referer: "https://agmarknet.gov.in/",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/153.0.0.0 Safari/537.36"
});


// ----------------------------------------------------
// Find commodity ID
// ----------------------------------------------------

const getCommodityId = async (crop) => {

    const response = await axios.get(
        `${AGMARKNET_BASE_URL}/daily-price-arrival/filters`,
        {
            headers: getHeaders()
        }
    );

    const commodities =
        response.data?.data?.cmdt_data || [];

    const commodity = commodities.find(
        (item) =>
            item.cmdt_name?.trim().toLowerCase() ===
            crop.trim().toLowerCase()
    );

    if (!commodity) {
        throw new Error(
            `Commodity "${crop}" was not found in Agmarknet.`
        );
    }

    console.log(
        `Agmarknet Commodity: ${commodity.cmdt_name} | ID: ${commodity.cmdt_id}`
    );

    return commodity.cmdt_id;
};


// ----------------------------------------------------
// Find state ID
// ----------------------------------------------------

const getStateId = async (location) => {

    const response = await axios.get(
        `${AGMARKNET_BASE_URL}/daily-price-arrival/filters`,
        {
            headers: getHeaders()
        }
    );

    const states =
        response.data?.data?.state_data || [];

    const state = states.find(
        (item) =>
            item.state_name?.trim().toLowerCase() ===
            location.trim().toLowerCase()
    );

    if (!state) {
        throw new Error(
            `State "${location}" was not found in Agmarknet.`
        );
    }

    console.log(
        `Agmarknet State: ${state.state_name} | ID: ${state.state_id}`
    );

    return state.state_id;
};


// ----------------------------------------------------
// Extract Agmarknet records
// ----------------------------------------------------

const extractRecords = (responseData, crop) => {

    const markets =
        Array.isArray(responseData?.markets)
            ? responseData.markets
            : [];

    const records = [];

    markets.forEach((market) => {

        const marketName =
            market.marketName?.trim() || "-";

        const dates =
            Array.isArray(market.dates)
                ? market.dates
                : [];

        dates.forEach((dateItem) => {

            const arrivalDate =
                dateItem.arrivalDate || "-";

            const priceData =
                Array.isArray(dateItem.data)
                    ? dateItem.data
                    : [];

            priceData.forEach((price) => {

                records.push({

                    market:
                        marketName,

                    commodity:
                        crop,

                    variety:
                        price.variety?.trim() || "-",

                    min_price:
                        price.minimumPrice ?? "-",

                    max_price:
                        price.maximumPrice ?? "-",

                    modal_price:
                        price.modalPrice ?? "-",

                    arrival_date:
                        arrivalDate

                });

            });

        });

    });

    return records;
};


// ----------------------------------------------------
// Get mandi prices
// ----------------------------------------------------

const getMandiPrices = async (crop, location) => {

    try {

        if (!crop) {
            throw new Error(
                "Crop is required."
            );
        }

        if (!location) {
            throw new Error(
                "State/location is required."
            );
        }


        // --------------------------------------------
        // Find commodity ID
        // --------------------------------------------

        const commodityId =
            await getCommodityId(crop);


        // --------------------------------------------
        // Find state ID
        // --------------------------------------------

        const stateId =
            await getStateId(location);


        // --------------------------------------------
        // Current date
        // --------------------------------------------

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            today.getMonth() + 1;


        console.log(
            `Requesting Agmarknet prices | ` +
            `Year: ${year} | ` +
            `Month: ${month} | ` +
            `State ID: ${stateId} | ` +
            `Commodity ID: ${commodityId}`
        );


        // --------------------------------------------
        // Request Agmarknet
        // --------------------------------------------

        const response =
            await axios.get(

                `${AGMARKNET_BASE_URL}/prices-and-arrivals/date-wise/specific-commodity`,

                {
                    params: {

                        year:
                            year,

                        month:
                            month,

                        stateId:
                            stateId,

                        commodityId:
                            commodityId,

                        includeExcel:
                            "false"

                    },

                    headers:
                        getHeaders(),

                    timeout:
                        30000
                }
            );


        // --------------------------------------------
        // Extract records
        // --------------------------------------------

        const records =
            extractRecords(
                response.data,
                crop
            );


        console.log(
            `Agmarknet markets found: ${
                response.data?.markets?.length || 0
            }`
        );

        console.log(
            `Agmarknet records found: ${records.length}`
        );


        return records;

    } catch (error) {

        console.error(
            "Agmarknet API Error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Unable to fetch mandi prices from Agmarknet."
        );
    }
};


module.exports = {
    getMandiPrices
};