import { useParams } from "react-router-dom";
import {
  useGetLyricsQuery,
  useGetRelatedQuery,
  useGetTrackQuery,
} from "../redux/services/spotify";
import Loader from "../components/Loader";
import DetailsHeader from "../components/DetailsHeader";
import { RelatedSongs } from "../components";
import { useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongDetails = () => {
  const { songid } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetLyricsQuery(songid);
  const { data: songData } = useGetTrackQuery(songid);
  const { data: relatedSongData, isFetching: relatedFetching } = useGetRelatedQuery(songid);
// console.log(relatedSongData)

  if (isFetching || relatedFetching) return <Loader />;

  const artistsId = songData?.tracks[0]?.artists[0]?.id;

  // const{lyrics:{lines}} = data
  console.log(data);

  return (
    <div className=" flex flex-col mt-10">
      <div className=" flex flex-col">
        <DetailsHeader songData={songData} />
      </div>
      <div className=" mt-10">
        <h2 className=" text-3xl text-white font-bold">Lyrics: </h2>
        <div className=" mt-5">
          {data?.lyrics?.lines?.map((line, i) => (
            <p key={i} className="text-[12px] text-gray-300 ">
              {line?.words}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <RelatedSongs
          data= {relatedSongData?.tracks}
          artistsId={artistsId}
          activeSong={activeSong}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};

export default SongDetails;
