import React, { useState } from "react";
import { UserCircle2 } from "lucide-react";
import { useMovie } from "../../context/Movies";

export default function Header() {
    const { searchResult , setSearchResult ,setInputActive ,inputValue , setInputValue} = useMovie();
    const handleInputChange = async(e)=>{
        setInputValue(e.target.value);
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/getAll/${e.target.value}`);
            const data = await res.json();
            setSearchResult(data.allMovies);
        }
        catch(err){
            alert(err.message)
        }
    }
  return (
    <header className="w-[100dvw] h-[64px] flex items-center justify-between !p-6 backdrop-blur-md bg-white/50 ">
      <div className="flex items-center space-x-2">
        <img
          src='absolute-cinema-cinema.png'
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="font-bold text-xl hidden sm:block">Cinema</span>
      </div>

      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        value={inputValue}
        onFocus={()=>setInputActive(true)}
        className="px-4 py-2 rounded-full border border-black placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <UserCircle2 className="w-8 h-8 cursor-pointer" />
    </header>
  );
}
