import  { createContext, useState, useContext } from 'react'

const MovieContext = createContext();
export const MovieProvider = ({children})=>{
    const [allMovies , setAllMovies] = useState([]);
    const [searchResult , setSearchResult] = useState([]);
    const [isInputActive , setInputActive] = useState(false);
    const [inputValue , setInputValue] = useState("");

    return <MovieContext.Provider value={{inputValue , setInputValue,allMovies, setAllMovies , searchResult , setSearchResult  , isInputActive ,setInputActive }}>
        {children}
    </MovieContext.Provider>
}

export const useMovie = () => useContext(MovieContext);