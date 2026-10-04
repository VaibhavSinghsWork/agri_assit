const {
    getMandiPrices
} = require("../services/mandiService");

const getPrices = async (req, res) => {

    try {

        const {
            crop,
            location
        } = req.query;

        if (!crop) {

            return res.status(400).json({
                success: false,
                message: "Crop is required."
            });

        }

        const prices = await getMandiPrices(
            crop,
            location
        );

        res.status(200).json({

            success: true,

            count: prices.length,

            data: prices

        });

    } catch (error) {

        console.error(
            "Mandi Controller Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};

module.exports = {
    getPrices
};