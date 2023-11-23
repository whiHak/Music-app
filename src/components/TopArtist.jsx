import React from "react";
import { useGetArtistQuery } from "../redux/services/spotify";

const TopArtist = ({ artistsId }) => {
  const { data, isFetching, error } = useGetArtistQuery(artistsId);
  console.log();

  return (
    <div>
      <img
        src={data?.artists[0]?.images[0]?.url}
        className=" h-24 w-24 rounded-full mt-4 object-cover"
        alt="artist banner"
      />
    </div>
  );
};

export default TopArtist;
