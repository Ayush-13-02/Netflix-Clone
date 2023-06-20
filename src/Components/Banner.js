import React, { useEffect, useState } from 'react'
import axios from '../axios';
import requests from '../request';
function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
      async function fetchData(){
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(Math.floor(Math.random()*request.data.results.length))
        setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length)])
        return request;
      }
      fetchData();
    }, [])
    
    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1)+"...":str;
    }
  return (
    <header className='banner'
        style={{
            backgroundSize:"cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/w500${movie?.backdrop_path}")`,
            backgroundPosition:"top center"
        }}
    >
        <div className='banner_contents'>
            <h1 className='banner_title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className='banner_buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <h1 className='banner_description'>{truncate(movie.overview,150)}</h1>
        </div>
        <div className='banner_fadesBottom'></div>
    </header>
  )
}

export default Banner
