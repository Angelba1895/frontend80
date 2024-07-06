import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const AgregarProductos = () => {

  const navigate = useNavigate();  
  
  const [productos, setProductos] = useState({
    nombre: "",
    marca: "",
    tipo: "",
    cantidad: "",
    numeroInvima: "",
    paisOrigen: "",
  });

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value
    });
  };

  const CrearProductos = async () => {
    const data = {
      nombre: productos.nombre,
      marca: productos.marca,
      tipo: productos.tipo,
      cantidad: productos.cantidad,
      numeroInvima: productos.numeroInvima,
      paisOrigen: productos.paisOrigen
    };

    try {
      const response = await APIInvoke.invokePOST("/api/productos", data);
      const idClientes = response._id;

      if (!idClientes) {
        throw new Error("Hubo un error al agregar un producto");
      }

      swal({
        title: 'Información',
        text: 'El producto fue creado con éxito',
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
      navigate("/productos");

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
    CrearProductos();
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
                <Link to={"/productos/agregar"} className="btn btn-block btn-primary btn-sm">Crear Producto</Link>
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
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese el nombre'
                    id='nombre'
                    name='nombre'
                    value={productos.nombre}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="marca">Marca</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese la marca'
                    id='marca'
                    name='marca'
                    value={productos.marca}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="tipo">Tipo</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese el tipo'
                    id='tipo'
                    name='tipo'
                    value={productos.tipo}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="cantidad">Cantidad</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese la cantidad'
                    id='cantidad'
                    name='cantidad'
                    value={productos.cantidad}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="numeroInvima">Número Invima</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Ingrese el numero invima'
                    id='numeroInvima'
                    name='numeroInvima'
                    value={productos.numeroInvima}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor="paisOrigen">Pais de Origen</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese el país de origen'
                    id='paisOrigen'
                    name='paisOrigen'
                    value={productos.paisOrigen}
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

export default AgregarProductos;