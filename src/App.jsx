import MovieDetails from "./components/movies/Movie";
import Movies from "./components/movies/Movies";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Movies/>} />
          <Route path="/:id" element={<MovieDetails/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}