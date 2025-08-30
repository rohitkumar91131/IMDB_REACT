import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`)
        const data = await res.json()
        if (!data.success) throw new Error("Movie not found")
        setMovie(data.movie)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="h-[100dvh] w-[100dvw] flex items-center justify-center text-gray-600 text-lg">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[100dvh] w-[100dvw] relative flex flex-col items-center justify-center text-center p-4 ">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-gray-800 text-white shadow hover:bg-gray-700"
        >
          ← Return
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486760.png"
          alt="No Movie"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <p className="text-xl font-semibold text-gray-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-lg bg-gray-800 text-white shadow hover:bg-gray-700"
      >
        ← Return
      </button>
      <div className="sm:grid sm:grid-rows-1 sm:grid-cols-[7fr_3fr] gap-2">
        <div  className="relative h-full w-full overflow-hidden rounded-lg !mt-1">
        <video
          src={movie.video_url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full blur-2xl scale-110 object-cover z-0"
        />  
        <div className="w-full h-full absolute inset-0 bg-black/50 z-0"></div>
        <div className=" relative w-full h-full z-10 aspect-video">
        <video
          src={movie.video_url}
          controls
          className="w-full h-full rounded-lg shadow-md object-contain"  
        />
        </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center flex-nowrap">
          {movie.title} 
            {/* <span className="text-gray-500 text-lg">({new Date(movie.releaseDate).getFullYear()})</span> */}
          </h1>
          <p className="text-gray-600 mb-2"><b>Released:</b> {new Date(movie.releaseDate).toDateString()}</p>
          <p className="text-gray-600 mb-2"><b>Runtime:</b> {movie.runtime} mins</p>
          <p className="text-gray-600 mb-2"><b>Rated:</b> {movie.rating}</p>
          <p className="text-gray-600 mb-2"><b>Genres:</b> {movie.genres?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Cast:</b> {movie.cast?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Directors:</b> {movie.directors?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Writers:</b> {movie.writers?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Countries:</b> {movie.countries?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Languages:</b> {movie.languages?.join(", ")}</p>
          <p className="text-gray-600 mb-2"><b>Awards:</b> {movie.awards?.text}</p>
          <p className="text-gray-600 mb-4"><b>IMDb:</b> {movie.imdb?.rating}/10 ({movie.imdb?.votes} votes)</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Plot</h3>
        <p className="text-gray-700">{movie.plot}</p>
        <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Full Plot</h3>
        <p className="text-gray-700">{movie.fullPlot}</p>
      </div>
    </div>
  )
}
