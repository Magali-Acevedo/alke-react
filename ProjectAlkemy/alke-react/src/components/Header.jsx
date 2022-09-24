import React from "react";
import '../Styles/Header.css';
import Buscador from "./Buscador";


const Header =(props)=> {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <h1 className="header-logo">MOVIES</h1>
                    <nav className="header-nav">
                        <ul>
                            <li>
                                <a href="/">HOME</a>
                            </li>
                            <li>
                                <a href="/Listado">LISTADO</a>
                            </li>
                            <li>
                                <a href="/Favoritos">FAVORITOS</a>
                            </li>
                            <li>
                                <span> {props.favorites.length!==0 && props.favorites.length} </span>
                            </li>

                        </ul>
                    </nav>
                </div>

                <Buscador/>
            </header>
        </>
    );
};

export default Header;