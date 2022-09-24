import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../Styles/DetailsMovie.css";

const DetailsMovie = () => {
  const token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get(`ID`);
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=2e881487d806686e974db193b2379e05&language=es-ES&page=1`;
    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  console.log(movieID);
  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>CARGANDO...</p>}
      {movie && (
        <>
          <article className="detailsMovie">
            <figure>
              <img className="detailsMovie-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster de la pelicula" />
            </figure>
            <section className="details-section">
              <div className="cont-one">
              <h2 className="movie-title">{movie.title} </h2>
              <h5> <span> ★ </span> { movie.vote_average}</h5>
              </div>

              <div className="container-subtitle">
              <h4>{movie.original_title}</h4> 
              <h5> {movie.release_date.substring(0,4)} </h5>
              <span>{movie.original_language} </span>
              </div>
              <h5>Género</h5>
              <ul className="container-genero">
                { movie.genres.map(oneGenre => <li key={oneGenre.id} > {oneGenre.name} </li>)}
              </ul>
              <p>
                { movie.overview }
              </p>
            </section>
          </article>
        </>
      )}
    </>
  );
};

export default DetailsMovie;
