import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiTags } from "../tags/tags";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api", prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token");
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: Object.values(apiTags),
    endpoints: () => ({}),
});

export default apiSlice;
