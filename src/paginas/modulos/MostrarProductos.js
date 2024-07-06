import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';


const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const response = await APIInvoke.invokeGET('/api/productos');
            setProductos(response);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    const eliminarProductos = async (e, idProducto) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokeDELETE(`/api/productos/${ idProducto }`);
            if (response.msg === "El producto ha sido eliminado") {
                const msg = "El producto fue eliminado correctamente";
                swal({
                    title: "Informacion",
                    text: msg,
                    icon: "success",
                    button: {
                        confirm: {
                            text: 'OK',
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                getProductos();
            } else {
                const msg = "El producto no pudo ser eliminado correctamente";
                swal({
                    title: "Error",
                    text: msg,
                    icon: "error",
                    button: {
                        confirm: {
                            text: 'OK',
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            }
        } catch (error) {
            console.log('Error al eliminar producto:', error);
        }
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <SidebarContainer />
            <div className='content-wrapper'>
                <ContentHeader
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"./home"}
                />
                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'>
                                <Link to={"/productos/agregar"} className='btn btn-block btn-primary btn-sm'>
                                    Crear Productos
                                </Link>
                            </h3>
                            <div className='card-tools'>
                                <button type='button' className='btn btn-tool' data-card-widget='collapse' title='collapse'>
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tool' data-card-widget='remove' title='Remove'>
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Marca</th>
                                        <th style={{ width: '10%' }}>Tipo</th>
                                        <th style={{ width: '10%' }}>Cantidad</th>
                                        <th style={{ width: '15%' }}>Numero Invima</th>
                                        <th style={{ width: '10%' }}>Pais de Origen</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto._id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.marca}</td>
                                            <td>{producto.tipo}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.numeroInvima}</td>
                                            <td>{producto.paisOrigen}</td>
                                            <td>
                                                <Link to={`/productos/editar/${producto._id}`} className="btn btn-primary mt-2 mb-2">
                                                <i className="fa-solid fa-pen-to-square" /></Link>
                                                <button onClick={(e) => eliminarProductos(e, producto._id)} className="btn btn-danger">
                                                <i className="fa-solid fa-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>    
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default MostrarProductos;