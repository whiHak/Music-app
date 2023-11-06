import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spotify23.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", process.env.VITEVITE_SPOTIFY_RAPID_API_KEY);
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
