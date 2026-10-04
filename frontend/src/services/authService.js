import api from "./api";

export const signupUser = async (userData) => {
    const response = await api.post(
        "/api/auth/signup",
        userData
    );

    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post(
        "/api/auth/login",
        credentials
    );

    return response.data;
};