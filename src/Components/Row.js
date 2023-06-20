import React, { useEffect, useState } from 'react'
import axios from '../axios';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('')
    const [trailerUrl, setTrailerUrl] = useState('')
    const baseURL = "https://image.tmdb.org/t/p/w500/";
    // A snippet of code which runs based on specific requests
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // console.log(request)
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    }, [fetchUrl])
    const opts = {
        height: "390",
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }
    const handleClick = (movie) => {
        if (trailerUrl && selectedMovie === movie.title) setTrailerUrl('');
        else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "").then((url) => {
                console.log(url)
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            }).catch((err) => console.log(err))
        }
        setSelectedMovie(movie.title)
    }
    // console.log(movies)
    return (
        <div className='row'>
            {/* Title */}
            <h2>{title}</h2>
            {/* Conatiner -> posters */}
            <div className='row_posters'>
                {
                    movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} onClick={() => handleClick(movie)} />
                        )
                    })
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
