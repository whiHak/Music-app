import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, key, i, isPlaying, activeSong, data }) => {
  const {
    albumOfTrack: {
      coverArt: { sources },
    },
  } = song;

  const {
    artists: { items },
  } = song;
  const artistId = items[0]?.uri.slice(15);

  const dispatch = useDispatch()
  const handlePause = () => {
    dispatch(playPause(false))
  };
  const handlePlay = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  };
  return (
    <div className=" flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className=" relative w-full h-56 group ">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.name === song.name
              ? " flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            data={data}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        </div>
        <img src={sources[2].url} alt="song avatar" />
      </div>
      <div className=" flex flex-col mt-4">
        <p className=" font-semibold text-lg text-white truncate">
          <Link to={`/songs/${key}`}>{song.name}</Link>
        </p>
        <p className=" text-sm text-gray-300 truncate">
          <Link to={artistId && `/artists/${artistId}`}>
            {items[0]?.profile.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
