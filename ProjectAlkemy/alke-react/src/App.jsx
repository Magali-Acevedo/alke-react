import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Listado from './components/Listado';
import Header from './components/Header';
import DetailsMovie from './components/DetailsMovie';
import Resultados from './components/Resultados';
import Favoritos from './pages/Favoritos';
import './Styles/global.css';
import Footer from './components/Footer';

function App() {

      /* Favoritos renderizar */
      const [ favorites, setFavorites ] = useState([]);

      useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');
        if (favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal);
          console.log(favsArray);
          setFavorites(favsArray);
        }
    
      },[])

      /* fin favoritos */


  /* Agregar o eliminar a favoritos */
  


  const addOrRemoveFronFav = e => {
    const favMovies = localStorage.getItem('favs');

    let tempMoviesFavs;
  
    if (favMovies === null ) {
      tempMoviesFavs = [];
  
    } else {
      tempMoviesFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    console.log(parent.querySelector('h3').innerText);
    const title = document.querySelector('.Card-title').innerText;
    const range = parent.querySelector('.Card-star').innerText;
    const overview = parent.querySelector('p').innerText;
    
    const movieDate = {
      imgURL, title, overview, range,
      id:btn.dataset.movieId
    }
    console.log(movieDate);

    let movieCheck = tempMoviesFavs.find(oneMovie => {
      return oneMovie.id === movieDate.id
    });

    if (!movieCheck) {
      tempMoviesFavs.push(movieDate);
      setFavorites(tempMoviesFavs);
      localStorage.setItem('favs',JSON.stringify(tempMoviesFavs));
      
      console.log("se agrego la pelicula");
    } else {
      let moviesDelete = tempMoviesFavs.filter(oneMovie => {
      
        return oneMovie.id !== movieDate.id
      });
      setFavorites(tempMoviesFavs);
      localStorage.setItem('favs', JSON.stringify(moviesDelete));
      
      console.log(tempMoviesFavs);
      console.log("Se elimino la pelicula");
    }

    

  }


  /* Fin A-D fav */


  return (
    <>
      <Header favorites={favorites} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Listado' element={<Listado addOrRemoveFronFav={addOrRemoveFronFav}/>} />
        <Route path='/DetailsMovie' element={<DetailsMovie />} />
        <Route path='/Resultados' element={<Resultados addOrRemoveFronFav={addOrRemoveFronFav} />} />
        <Route path='/Favoritos' element={ <Favoritos addOrRemoveFronFav={addOrRemoveFronFav} favorites={favorites}  />} exact={true} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
