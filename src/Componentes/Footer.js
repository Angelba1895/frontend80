import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Hecho por: Angel Barragan <Link to={"https://github.com/Angelba1895"}><i className="fa-brands fa-square-github"></i>
            </Link>.</strong> Todos los derechos reservados.
        </footer>
    );
}

export default Footer;