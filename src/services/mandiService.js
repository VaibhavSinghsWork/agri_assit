import api from "./api";

export const fetchMandiPrices = async (crop, location) => {
    const response = await api.get("/mandi/prices", {
        params: {
            crop,
            location
        }
    });

    return response.data;
};