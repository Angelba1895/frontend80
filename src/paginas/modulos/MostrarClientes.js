import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';


const MostrarClientes = () => {
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const response = await APIInvoke.invokeGET('/api/clientes');
            setClientes(response);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokeDELETE(`/api/clientes/${ idCliente }`);
            if (response.msg === "El cliente ha sido eliminado") {
                const msg = "El cliente fue eliminado correctamente";
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
                getClientes();
            } else {
                const msg = "El cliente no pudo ser eliminado correctamente";
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
            console.log('Error al eliminar cliente:', error);
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
                                <Link to={"/clientes/agregar"} className='btn btn-block btn-primary btn-sm'>
                                    Crear Clientes
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
                                        <th style={{ width: '15%' }}>Nombres Clientes</th>
                                        <th style={{ width: '15%' }}>Apellidos Clientes</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '10%' }}>Correo</th>
                                        <th style={{ width: '15%' }}>Numero Contacto</th>
                                        <th style={{ width: '10%' }}>Nit</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente) => (
                                        <tr key={cliente._id}>
                                            <td>{cliente.nombres}</td>
                                            <td>{cliente.apellidos}</td>
                                            <td>{cliente.cedula}</td>
                                            <td>{cliente.correo}</td>
                                            <td>{cliente.numeroContacto}</td>
                                            <td>{cliente.nit}</td>
                                            <td>{cliente.direccion}</td>
                                            <td>
                                                <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-primary mt-2 mb-2">
                                                <i className="fa-solid fa-pen-to-square" /></Link>
                                                <button onClick={(e) => eliminarClientes(e, cliente._id)} className="btn btn-danger">
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

export default MostrarClientes;