import { useParams } from "react-router-dom";
import {
  useGetRelatedQuery,
  useGetArtistQuery,
  useGetArtistRelatedQuery,
} from "../redux/services/spotify";
import Loader from "../components/Loader";
import DetailsHeader from "../components/DetailsHeader";
import { Artist, RelatedSongs } from "../components";
import { useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { artistsId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: relatedSongData, isFetching: relatedFetching } = useGetArtistRelatedQuery({artistsId});

  console.log(relatedSongData)

  if (relatedFetching) return <Loader />;

    // const{lyrics:{lines}} = data

  return (
    <div className=" flex flex-col mt-10">
      <div className=" flex flex-col h-40 w-40">
        <Artist artistsId={artistsId} border="true" name="true"/>
      </div>
      <div className="mt-10">
        <RelatedSongs
          data= {relatedSongData?.data?.artist?.discography?.singles?.items}
          artistsId={artistsId}
          activeSong={activeSong}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};

export default ArtistDetails;
