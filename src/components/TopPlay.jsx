import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import { useGetSearchQuery } from "../redux/services/spotify";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause,setActiveSong } from "../redux/features/playerSlice";
import Artist from "./Artist";

const TopCharts = ({
  song,
  song: {
    albumOfTrack: {
      coverArt: { sources },
    },
  },
  i,
  isPlaying,
  activeSong,
  data,
  handlePause,
  handlePlay,
}) => {
  console.log(song)
  return (
    <div className=" w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg  cursor-pointer mt-0">
      <div className="w-full flex flex-row items-center ">
        <img src={sources[1].url} alt="song avatar" className=" mr-4" />
        <div className=" flex flex-col truncate ">
          <Link to={`/songs/${song?.id}`}>
            <h3 className=" text-white truncate font-bold">{song.name}</h3>
          </Link>
          <Link to={`/artists/${song?.artists?.items[0]?.uri?.slice(15)}`}>
            <p className=" text-base text-gray-300">
              {song.artists.items[0].profile.name}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        data={data}
        activeSong={activeSong}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, currentSongs } = useSelector(
    (state) => state.player
  );
  console.log(currentSongs)
  const { data, isFetching, error } = useGetSearchQuery();

  const topPlays = currentSongs?.slice(0, 5);
  console.log(topPlays);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = ({ song, i }) => {
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
  };
  console.log(isPlaying)


  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView();
  });

  return (
    <div
      ref={ref}
      className=" xl:ml-3 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col"
    >
      <div className=" w-full felx flex-col">
        <div className=" flex flex-row justify-between items-center mt-4">
          <h2 className=" text-white text-2xl font-bold">Top Charts</h2>
          <Link to="/top-charts">
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          {topPlays?.map((song, i) => (
            <TopCharts
              key={song.id}
              song={song.data}
              i={i}
              data={data?.tracks?.items}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay({song:song.data},  i)}
            />
          ))}
        </div>
      </div>
      <div className=" w-full items-center mt-4 flex flex-col">
        <div className=" w-full flex flex-row justify-between items-center">
          <h2 className=" text-white text-2xl font-bold">Top Artists</h2>
          <Link to="/top-artists">
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className=" mr-4"
        >
          {topPlays?.map((song, indx) => (
            <SwiperSlide
              key={song.data?.id}
              style={{ width: "20%", height: "auto" }}
              className=" shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artist/${song.data?.artists?.items[0].uri?.slice(15)}`}>
                <Artist artistsId = {song.data?.artists?.items[0].uri?.slice(15)} name=""/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
