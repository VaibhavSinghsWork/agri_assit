
const { getMandiPrices } = require("../services/mandiService");

const getPrices = async (req, res) => {
    try {
        const { crop, location } = req.query;

        if (typeof crop !== "string" || !crop.trim()) {
            return res.status(400).json({
                success: false,
                message: "Crop is required."
            });
        }

        if (typeof location !== "string" || !location.trim()) {
            return res.status(400).json({
                success: false,
                message: "State/location is required."
            });
        }

        const prices = await getMandiPrices(crop, location);

        return res.status(200).json({
            success: true,
            count: prices.length,
            data: prices
        });
    } catch (error) {
        console.error("Mandi Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch mandi prices. Please try again later."
        });
    }
};

module.exports = {
    getPrices
};
