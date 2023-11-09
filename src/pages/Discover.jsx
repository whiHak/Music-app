import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/spotify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Discover = () => {
  window.scrollTo({ top: "0"})
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  
  if (isFetching) return <Loader />;
  if (error) return <Error />;
  
  const {
    tracks: { items },
  } = data;
  console.log(items);
  const title = "Pop";

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-3xl font-bold text-white text-left">
          Discover {title}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className=" bg-black outline-none text-gray-300 text-sm sm:mt-0 mt-5 p-3 rounded-lg "
        >
          {genres?.map((item) => (
            <option
              className=" text-sm  w-1"
              key={item.value}
              value={item.value}
            >
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className=" flex flex-wrap sm:justify-center justify-start gap-8">
        {items?.map((song, i) => (
          <SongCard
            key={song?.data?.uid?.slice(14)}
            i={i}
            song={song?.data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={items}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
