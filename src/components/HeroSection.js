import { useState, useEffect } from "react"

const HeroSection = () => {
    const [movie, setMovie] = useState(null)
    const pageState = null

    const fetchData = async () => {
        const response = await fetch("/.netlify/functions/getMovies", {
            method: "POST",
            body: JSON.stringify({genre: "Fantasy", pageState: pageState})
        })
        const responseBody = await response.json()
        const movies = responseBody.data.movies_by_genre.values
        setMovie(movies[Math.round(Math.random() * movies.length)])
        }
    
        useEffect(() => {
          fetchData()
        }, [])
    


    return (
        <>
        {movie && (
            <div className="hero">
                <video className="hero-video" muted autoPlay={true} loop>
                    <source src={movie.thumbnail} type="video/mp4"/>
                    {console.log("Hero Movie",movie)}
                </video>

                <div className="info-section">
                    <h1>{movie.title}</h1>
                    <h3 className="hero-blurb">{movie.synopsis}</h3>
                    <h5>Duration: {Math.floor(movie.duration/60)}h {movie.duration%60}min</h5>
                    <div className="button-section">
                        <div className="button play">
                            <span><i className="fas fa-play"></i></span>
                            Play
                        </div>
                        <div className="button more">
                            <span><i className="fas fa-info-circle"></i></span>
                            More Info
                        </div>
                    </div>
                </div>

            </div>
        )}

        </>
    )
}

export default HeroSection