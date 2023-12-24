import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePause, handlePlay}) => {
  


  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.name === song?.name ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    {/* {console.log(activeSong)} */}
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={artistId ? song?.releases?.items[0]?.coverArt?.sources[0]?.url : song?.album?.images[0]?.url}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song?.id}`}>
              <p className="text-xl font-bold text-white">
                {song?.name}
              </p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.releases?.items[0]?.name}
            </p>
          )}
          {/* <p className="text-base text-gray-300 mt-1">
            {artistId ? null : song?.artists[0]?.name}
          </p> */}
        </div>
      </div>
      {!artistId
        ? (
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        )
        : null}
    </div>
  );
}


export default SongBar;