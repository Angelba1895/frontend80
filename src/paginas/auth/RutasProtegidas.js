import React,{useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';

const RutasProtegidas = ({element}) => {
const [redirec, setRedirec] = useState(false);

//Función que nos diga si el token expiro
const TokenExpirado = ()=>{
    const token = localStorage.getItem('token');
    if(!token){
        //Si no tenemos un token, nos envía a la página inicial
        setRedirec(true);
        return;
    }

    //Decodificar el token para obtener la fecha de expiración
    // eslint-disable-next-line
    const tokenD = JSON.parse(atob(token.split('.') [1]));
    const timeexp = tokenD.exp*1000; //Convertimos a milisegundos

    //Obtner hora actual
    const actualTime = Date.now();
    
    if(actualTime >= timeexp){
        swal({
            title: 'Expiro su sesión.',
            text: "Su sesión expiro, vuelva a iniciar sesión.",
            icon: 'warning',
            buttons: {
              confirm: {
                text: 'OK',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
          setTimeout(()=>{
            localStorage.removeItem('token');
            setRedirec(true);
        }, 1000);
        return;
        // eslint-disable-next-line
    }   
};
    //Verificamos tiempo de expiración cuando se monta el componente
    useEffect(()=> {
        const timeout = setInterval(TokenExpirado, 100)
        return () => clearInterval(timeout); //Limpia el token al desmontar el componente
    },[]);

    if(redirec){
        return <Navigate to='/login'/>
    }
    //Reenderizar la ruta
    return element;
};

export default RutasProtegidas