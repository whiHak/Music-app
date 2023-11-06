import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spotify23.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "31249d45admsh6af900fa2c64d2ep1ee6e7jsnacb722305259");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTopCharts: build.query({
      query: () => "search/?q=pop&type=tracks&limit=50",
    }),
  }),
});

export const { useGetTopChartsQuery } = spotifyApi;
