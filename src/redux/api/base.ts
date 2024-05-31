import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, TOKEN_STORAGE_KEY } from "../..";

export const tagTypes = [
  "user",
  "employee",
  "employees",
  "suggestion",
  "suggestions",
  "comments",
  "comment",
  "admin",
  "organization",
  "organizations",
] as const;
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const getToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const token = getToken && JSON.parse(getToken);
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
