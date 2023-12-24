import React from "react";
import { useGetArtistQuery } from "../redux/services/spotify";

const Artist = ({ artistsId, border, name}) => {
  const { data, isFetching, error } = useGetArtistQuery(artistsId);
  console.log(data);

  return (
    <div className="w-full flex items-center">
      <img
        src={data?.artists[0]?.images[0]?.url}
        className={` ${border ? " rounded-full mt-4 object-cover w-full border-white border-[5px]": "rounded-full mt-4 object-cover w-full " }`}
        alt="artist banner"
      />
      {name.length > 0  && (
        <p 
          className=" ml-5 text-2xl text-white font-bold"
          style={{whiteSpace: "nowrap"}}
        >
          {data?.artists[0]?.name}
        </p>
      )}
    </div>
  );
};

export default Artist;
