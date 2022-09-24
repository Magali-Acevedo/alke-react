import React from "react";
import '../Styles/Favoritos.css';

function Favoritos (props) {
    /*const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');
      if (favsInLocal !== null) {
        const favsArray = JSON.parse(favsInLocal);
        console.log(favsArray);
        setFavorites(favsArray);
      }

    },[])*/
    return(
        <>
        <h2 className="fav-title">FAVORITOS</h2>
       
        <section className="Lista lista-fav" >
        {!props.favorites.length && <p className="fav-p">No tienes agregado ningun favorito</p>}
        
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="Card" key={idx}>
              
              <img className="Card-img" src={oneMovie.imgURL} alt="Imagen de la pelicula" />
              <button className="btn-like" onClick={props.addOrRemoveFronFav} data-movie-id={oneMovie.id}>🖤</button>

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
export default Favoritos;