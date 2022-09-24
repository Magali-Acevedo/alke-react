import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import "../Styles/Listado.css";

const Listado = (props) => {
  const token = sessionStorage.getItem("token");
  const [moviesList, setmoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=2e881487d806686e974db193b2379e05&language=es-ES&page=1";
    axios.get(endPoint).then((response) => {
      const apiData = response.data;
      setmoviesList(apiData.results);
    })
    .catch(error =>{
        swAlert( <p>Estamos teniendo inconvenientes, intente más tarde.</p> )
    })
  }, [setmoviesList]);
  console.log(moviesList);

  /*Agregar O eliminar

  const favMovies = localStorage.getItem('favs');

  let tempMoviesFavs;

  if (favMovies === null ) {
    tempMoviesFavs = [];

  } else {
    tempMoviesFavs = JSON.parse(favMovies);
  }

  const addOrRemoveFronFav = e => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h3').innerText;
    const overview = parent.querySelector('p').innerText;
    console.log(btn.dataset)
    const movieDate = {
      imgURL, title, overview,
      id:btn.dataset.movieId
    }
    console.log(movieDate);
    let movieCheck = tempMoviesFavs.find(oneMovie => {
      return oneMovie.id === movieDate.id
    });
    if (!movieCheck) {
      tempMoviesFavs.push(movieDate);
      localStorage.setItem('favs',JSON.stringify(tempMoviesFavs));
      console.log("se agrego la pelicula");
    } else {
      let moviesDelete = tempMoviesFavs.filter(oneMovie => {
        return oneMovie.id !== movieDate.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesDelete));
      console.log("Se elimino la pelicula");
    }

  }
 */

  return (
    <>
      {!token && <Navigate to="/" />}

      <section className="Lista" >
        {moviesList.map((oneMovie, idx) => {
          return (
            

            <div className="Card" key={idx}>
              <figure>
              <img className="Card-img" src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="Imagen de la pelicula" />
              </figure>
              <button className="btn-like" onClick={props.addOrRemoveFronFav} data-movie-id={oneMovie.id}>🖤</button>
              <div className="Card-container">
              <div className="Card-container--info">
                <h3 className="Card-title">{ oneMovie.title }</h3>
                <span className="Card-star">{ oneMovie.vote_average}</span>
                {<p className="Card-description">
                {oneMovie.overview.substring(0,125)}...
                </p> }
              </div>
              <a className="btn-primary btn-view" href={`/DetailsMovie?ID=${oneMovie.id}`}>
                VER +
              </a>
              </div>

            </div>
          );
        })}
      </section>
    </>
  );
};
export default Listado;
