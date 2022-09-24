import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import '../Styles/Resultados.css';

const Resultados =(props)=>{
  const token = sessionStorage.getItem("token");
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get(`keyword`);

    const [ moviesResults, setMoviesResults ] = useState([]);

    useEffect(()=>{
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=2e881487d806686e974db193b2379e05&language=es-ES&page=1&query=${keyword}`;
        axios.get(endPoint).then(response =>{
            const moviesArray = response.data.results;
            setMoviesResults(moviesArray);
            console.log(moviesArray);
        })
        .catch(error => console.log(error))
        
    },[keyword]);
    
    
    return(
        <>
        {!token && <Navigate to="/" />}
        <h1 className="res-title">Resultados de la busqueda</h1>
        <p className="busqueda">Todo lo que tenemos sobre: {keyword}</p>
        <section className="Lista lista-resultado" >
        {!moviesResults.length && <p>No se han encontrado resultados</p>}
        {moviesResults.map((oneMovie, idx) => {
          return (
            <div className="Card" key={idx}>
              
              <img className="Card-img" src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="Imagen de la pelicula" />
              <button onClick={props.addOrRemoveFronFav} className="btn-like" data-movie-id={oneMovie.id}>🖤</button>

              <div className="Card-container">
              <div className="Card-container--info">
                <h3 className="Card-title">{ oneMovie.title }</h3>
                <span className="Card-star">{ oneMovie.vote_average}</span>
                 <p className="Card-description">
                {oneMovie.overview.substring(0,125)}...
                </p> 
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
    )
}

export default Resultados;