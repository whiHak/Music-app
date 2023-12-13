import React from "react";
import { useGetArtistQuery } from "../redux/services/spotify";

const Artist = ({ artistsId }) => {
  const { data, isFetching, error } = useGetArtistQuery(artistsId);
  console.log();

  return (
    <div className="w-full">
      <img
        src={data?.artists[0]?.images[0]?.url}
        className=" rounded-full mt-4 object-cover w-full"
        alt="artist banner"
      />
    </div>
  );
};

export default Artist;
