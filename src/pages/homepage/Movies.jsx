import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMovie } from "../../context/Movies";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const {allMovies, setAllMovies} = useMovie();

  useEffect(() => {

    async function fetchMovies() {
      try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/getAll`)
        let data = await res.json()
        setAllMovies(data.allMovies)
        console.log(data);
        if(data.allMovies.length !== 0){
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Movies</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-lg overflow-hidden animate-pulse rounded-lg"
            >
              <div className="relative">
                <div className="w-full h-56 bg-gray-300"></div>
                <span className="absolute top-2 right-2 bg-gray-400 w-12 h-5 rounded-md"></span>
              </div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-5 bg-gray-200 rounded-full w-12"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] container mx-auto p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Movies</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allMovies.length>0 && allMovies.map((movie) => (
          <Link to={movie._id}
            key={movie._id}
            className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 rounded-lg"
          >
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded-md">
              {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {movie.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{movie.plot}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genres &&
                  movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
