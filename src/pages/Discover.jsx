import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSearchQuery } from "../redux/services/spotify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectGenreListId, setCurrentSongs } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSearchQuery(genreListId || "POP");
  useEffect(() => {
    if (data && !isFetching && !error) {
      dispatch(setCurrentSongs(data)); // Assuming the data structure matches the hits
    }
  }, [data, isFetching, error, dispatch]);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  console.log(data);

  const {
    tracks: { items },
  } = data;
  // console.log(items);
  const title = genres.find(({value})=>value === genreListId)?.title;

  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-3xl font-bold text-white text-left">
          Discover {title || "Pop"}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId ||"Pop"}
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
      <div className="w-full flex flex-wrap  xl:justify-start justify-center gap-8">
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
