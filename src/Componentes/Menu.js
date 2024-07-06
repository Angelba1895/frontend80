import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return ( 
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/clientes"} className="nav-link">
                        <i className="fa-regular fa-copyright" />
                        <p>
                            lientes
                        </p>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/productos"} className="nav-link">
                        <i className="fa-brands fa-product-hunt" />
                        <p>
                            roductos
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Menu;