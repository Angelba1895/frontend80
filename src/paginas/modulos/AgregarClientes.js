import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const AgregarClientes = () => {

  const navigate = useNavigate();  

  const [clientes, setClientes] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    numeroContacto: "",
    nit: "",
    direccion: ""
  });

  useEffect(() => {
    document.getElementById("nombres").focus();
  }, []);

  const onChange = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value
    });
  };

  const CrearClientes = async () => {
    const data = {
      nombres: clientes.nombres,
      apellidos: clientes.apellidos,
      cedula: clientes.cedula,
      correo: clientes.correo,
      numeroContacto: clientes.numeroContacto,
      nit: clientes.nit,
      direccion: clientes.direccion
    };

    try {
      const response = await APIInvoke.invokePOST("/api/clientes", data);
      const idClientes = response._id;

      if (!idClientes) {
        throw new Error("Hubo un error al agregar un cliente");
      }

      swal({
        title: 'Información',
        text: 'El cliente fue creado con éxito',
        icon: 'success',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
      navigate("/clientes");

    } catch (error) {
      swal({
        title: 'Error',
        text: error.message,
        icon: 'error',
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
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CrearClientes();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Dashboard Angel"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Dashboard"}
          ruta1={"/home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link to={"/clientes/agregar"} className="btn btn-block btn-primary btn-sm">Crear Cliente</Link>
              </h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus"></i>
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor="nombres">Nombres</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese su nombre'
                    id='nombres'
                    name='nombres'
                    value={clientes.nombres}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="apellidos">Apellidos</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese sus apellidos'
                    id='apellidos'
                    name='apellidos'
                    value={clientes.apellidos}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="cedula">Cédula</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su cédula'
                    id='cedula'
                    name='cedula'
                    value={clientes.cedula}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="correo">Correo</label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Ingrese su correo'
                    id='correo'
                    name='correo'
                    value={clientes.correo}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="numeroContacto">Número de Contacto</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su número de contacto'
                    id='numeroContacto'
                    name='numeroContacto'
                    value={clientes.numeroContacto}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="nit">NIT</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese su NIT'
                    id='nit'
                    name='nit'
                    value={clientes.nit}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese su dirección'
                    id='direccion'
                    name='direccion'
                    value={clientes.direccion}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type='submit' className='btn btn-primary'>Guardar</button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AgregarClientes;