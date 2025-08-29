import MovieDetails from "./pages/MoviePage/Movie";
import Movies from "./pages/homepage/Movies";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/homepage/Home";
import { MovieProvider } from "./context/Movies";
export default function App(){
  return (
    <>
      <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route path="/" element ={<Home/>} />
          <Route path="/:id" element={<MovieDetails/>} />
        </Routes>
        </MovieProvider>
      </BrowserRouter>
    </>
  )
}