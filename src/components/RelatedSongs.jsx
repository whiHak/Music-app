import { useDispatch } from "react-redux";
import SongBar from "./SongBar";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const RelatedSongs = (
  data,
  artistsId,
  activeSong,
  isPlaying
) => {

  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(playPause(false))
  };
  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, i }))
    dispatch(playPause(true))
  };
  
  return (
    <div className=" flex felx-col ">
      <h2 
        className=" text-2xl font-bold text-white"
        style={{whiteSpace: "nowrap"}}
      >
        Related Songs:
      </h2>

      {data && (
        <div className=" mt-6 w-full flex flex-col">
          {Object.values(data)?.map((song, i) => (
            <SongBar
              song={song}
              i={i}
              artistsId={artistsId}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedSongs;
