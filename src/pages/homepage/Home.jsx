import Movies from "./Movies"
import Header from "./Header"
import SearchResult from "./SearchResult"


function Home() {
  return (
    <div>
      <Header/>  
      <SearchResult/>
      <Movies/>
    </div>
  )
}

export default Home
