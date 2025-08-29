import React, { useEffect, useRef, useState } from "react";
import { useMovie } from "../../context/Movies";
import { Link } from "react-router-dom";

export default function SearchResult() {
  const { searchResult ,setSearchResult,isInputActive ,setInputActive ,inputValue} = useMovie();
  const [ searchHide , setSearchHide] = useState(false);
  const wrapperRef = useRef();
  useEffect(()=>{
    if(isInputActive){
        setSearchHide(true);
    }

    return ()=>{
        setSearchResult([])   ;
    }
  },[inputValue])
  useEffect(()=>{
    const clickOutside = (e)=>{
        if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
            setSearchHide(false);
        }
    }

    document.addEventListener("mousedown",clickOutside);

    return ()=>{
        document.removeEventListener("mousedown",clickOutside)
    }
  },[])
  return (
    <div className={`border border-red-500 rounded-md absolute top-[64px] z-10 flex flex-col w-[50dvw] margin-auto right-2 items-center bg-white h-[50dvh] space-y-4 overflow-y-scroll mt-4 ${searchHide ? "" : "hidden"}`} ref={wrapperRef}>
      {searchResult.length === 0 && (
        <p className="text-gray-500">
            {
                inputValue.trim() === "" ? "Search Movies" : "No Movie found"
            }
        </p>
      )}

      {searchResult.map((movie) => (
        <Link
          to={`/${movie._id}`}
          key={movie._id}
          className="flex items-center space-x-4 bg-white/50 backdrop-blur-md rounded-lg p-4 shadow-md"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-20 h-28 object-cover rounded-md flex-shrink-0"
          />

          <div className="flex-1">
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-gray-700 text-sm mt-1 line-clamp-2">
              {movie.plot}
            </p>

            <div className="flex flex-wrap text-gray-500 text-xs mt-2 gap-2">
              <span>{movie.releaseDate?.split("T")[0]}</span>
              <span>{movie.runtime} min</span>
              <span>Rating: {movie.rating}</span>
              <span>Genres: {movie.genres.join(", ")}</span>
              <span>IMDb: {movie.imdb.rating} ({movie.imdb.votes} votes)</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
