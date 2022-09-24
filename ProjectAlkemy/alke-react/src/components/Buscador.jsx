import React from "react";
import { useNavigate } from "react-router-dom";
import swAlert from "@sweetalert/with-react";
import '../Styles/Buscador.css';

const Buscador =()=> {
    const history = useNavigate();
    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if(keyword.length === 0){
            swAlert({
                text:"Tienes que escribir una palabra",
                icon:"warning",
            })
        } else {
            e.currentTarget.keyword.value = '';
            history(`/resultados?keyword=${keyword}`);
        }
    }
    return(
        <>
         <form className="search" onSubmit={submitHandler}>
            <input 
            autoComplete="off"
            className="search-input"
            type="serch"
            name="keyword"
            placeholder="Buscar..." 
            />
            <button className="btn btn-search" type="submit">🔍</button>
            
         </form>
        </>
    )
}
export default Buscador;