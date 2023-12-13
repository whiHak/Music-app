import { Link } from "react-router-dom";

const DetailsHeader = ({songData}) => {

  const artistsId = songData?.tracks[0]?.artists[0]?.id;
  console.log(songData)
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center truncate">
        <img 
          src={songData?.tracks[0]?.album?.images[0]?.url} 
          alt="song avatar"
          className=" sm:h-48 h-22 sm:w-48 w-22 rounded-full object-cover border-solid border-[2px] border-white " 
        />
        <div className="ml-5">
          <p className="text-2xl font-bold text-white ">{songData?.tracks[0]?.name}</p>
          {songData && (
            <Link to={`/artists/${artistsId}`}>
              <p className="text-gray-300 text-[14px]">{songData?.tracks[0].artists[0]?.name}</p>
            </Link>
          )}
        </div>
      </div>
  
  
    </div>
  );
}


export default DetailsHeader;
