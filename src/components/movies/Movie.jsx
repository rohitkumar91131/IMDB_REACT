import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://databasecollection.vercel.app/getmovies/${id}`)
        if (!res.ok) throw new Error("Failed to fetch movie")
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) return <p className="h-[100dvh] w-[100dvw] flex items-center justify-center">Loading...</p>
  if (error) return <p className="h-[100dvh] w-[100dvw] flex items-center justify-center">Error: {error}</p>
  if (!movie) return <p className="h-[100dvh] w-[100dvw] flex items-center justify-center">No movie found.</p>

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Movies
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {movie.title} <span className="text-gray-500">({movie.year})</span>
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full">Released: {new Date(movie.released).toDateString()}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Runtime: {movie.runtime} mins</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Rated: {movie.rated}</span>
              </div>
              <p className="text-gray-700 mb-4">{movie.plot}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="space-y-1 text-gray-800 text-sm">
                <p><b>Cast:</b> {movie.cast?.join(", ")}</p>
                <p><b>Directors:</b> {movie.directors?.join(", ")}</p>
                <p><b>Writers:</b> {movie.writers?.join(", ")}</p>
                <p><b>Countries:</b> {movie.countries?.join(", ")}</p>
                <p><b>Languages:</b> {movie.languages?.join(", ")}</p>
                <p><b>Awards:</b> {movie.awards?.text}</p>
                <p><b>IMDb:</b> ⭐ {movie.imdb?.rating}/10 ({movie.imdb?.votes} votes)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-2">Full Plot</h2>
        <p className="text-gray-700 leading-relaxed">{movie.fullplot}</p>
      </div>
    </div>
  )
}
