import { useState } from "react";
import { useEffect } from "react"

export default function Movies(){
    const [Movies ,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchMovies(){
            let res = await fetch("https://databasecollection.vercel.app/getmovies");
            let data = await res.json();
            setMovies(data);
            console.log(data)
        }
        fetchMovies();
    },[])
    if(Movies.length === 0){
        return <div className="fixed top-1/2 left-1/2">Loading...</div>
    }
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Movies</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    Movies.map((movie) =>(
                        <div key={movie._id} className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="relative">
                                <img 
                                   src={movie.poster}  
                                   alt={movie.title}
                                   className="w-full h-56 object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded-md">
                                    {movie.year}
                                </span>
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
                                <p className="text-gray-600 text-sm mt-1">{movie.plot}</p>   
                                {
                                    movie.genres && movie.genres.map((genre,index)=>(
                                        <span key={index} className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                            {genre}
                                        </span>
                                    ))
                                }                         
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}