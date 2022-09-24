import React,{ useState, useEffect } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (email === "" || password === "") {
      swAlert(<h2>Los campos no pueden estar vacios.</h2>);
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>Escribe una dirección válida.</h2>);
      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Credenciales inválidas.</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert({
          icon: "success",
          text: "Ingresaste correctamente",
          button: false,
          timer: 3000,
        });
        console.log(res);
        const tokenRecibido = res.data.token;
        const userLogin = email;
        
        sessionStorage.setItem("token", tokenRecibido);
        sessionStorage.setItem("user", userLogin);        
        navigate("/Listado");
      });
  };

  //Llamado de imagenes
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
  return (
    <>
     {token && <Navigate to="/Listado" /> }
     <p> {user} </p>
      <section className="Login">
        <div className="Login-left">
          {/* <h2>BIENVENIDO!!!</h2>
          <p>
            Vas a poder acceder a la cartelera de peliculas
            <br />
            Podras ver los detalles de la pelicula y agregar <br />
            las que mas te gusten a la sección de favoritos
          </p> */}
          {moviesList.map((oneMovie, idx) => {
          return (
            <>
              <figure className="Login-left--figure"><img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="Img de pelicula" /></figure>
            </>
          );
        }).slice(0,6)}
        </div>

        <div className="Login-container">
          <article className="Login-card">
          <h2 className="Login-title">Login</h2>
          <form className="Login-form" onSubmit={submitHandler}>
            <label className="label-container">
              <span>Email</span>
              <br />
              <input className="input-primary" type="text" name="email" />
            </label>
            <br />
            <label className="label-container">
              <span>Password</span>
              <br />
              <input
                className="input-primary"
                type="password"
                name="password"
              />
            </label>
            <br />
            <button type="submit" className="btn-primary">
              INGRESAR
            </button>
          </form>
          </article>
          
        </div>
      </section>
    </>
  );
};
export default Login;
