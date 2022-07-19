import axios from "axios";

export const signUpRequest = async (body) => {
    try {
        const res = await axios.post("/api/auth/signup", body);
        return res;
    } catch (error) {
        return error.response;
    }
};

export const signInRequest = async (body) => {
    try {
        const res = await axios.post("/api/auth/signin", body);
        return res;
    } catch (error) {
        return error.response;
    }
};

export const logoutRequest = async (token) => {
    try {
        const res = await axios.post(
            "/api/auth/logout",
            {},
            {
                headers: {
                    "x-access-token": token,
                },
            }
        );
        return res;
    } catch (error) {
        return error.response;
    }
};

export const reloadToken = async (token) => {
    try {
        const res = await axios.post(
            "/api/auth/",
            {},
            {
                headers: {
                    "x-access-token": token,
                },
            }
        );
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getUser = async (token) => {
    try {
        if (token === '') return {}
        const res = await axios.get("/api/users/user", {
            headers: {
                "x-access-token": token,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateUser = async (token, body) => {
    try {
        const res = await axios.put("/api/users/user", body, {
            headers: { "x-access-token": token },
        })
        return res
    } catch (error) {
        return error.response
    }
};
