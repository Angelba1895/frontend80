import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";



const EditarClientes = () => {

  const navigate = useNavigate();

//Definimos los estados
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');
  const {id} = useParams();

  //Creamos nuestra función de modificar clientes
  const ModificarClientes = async (e) =>{
    e.preventDefault();
    await APIInvoke.invokePUT(`/api/clientes/${id}`,{
      nombres: nombres, apellidos: apellidos, cedula: cedula, 
      correo: correo, numeroContacto: numeroContacto, nit: nit, 
      direccion: direccion
    })
    navigate('/clientes');
  }
  useEffect(() =>{
    getClientes();
    // eslint-disable-next-line 
  },[]);

  const getClientes = async () =>{
    const response = await APIInvoke.invokePUT(`/api/clientes/${id}`)
    setNombres(response.nombres);
    setApellidos(response.apellidos);
    setCedula(response.cedula);
    setCorreo(response.correo);
    setNumeroContacto(response.numeroContacto);
    setNit(response.nit);
    setDireccion(response.direccion);
  }

return(

  <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>
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
            <form onSubmit={ModificarClientes}>
              <div className='form-group'>
                <label htmlFor="nombres">Nombres</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese su nombre'
                  id='nombres'
                  name='nombres'
                  value={nombres}
                  onChange={(e) =>setNombres(e.target.value)}
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
                  value={apellidos}
                  onChange={(e) =>setApellidos(e.target.value)}
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
                  value={cedula}
                  onChange={(e) =>setCedula(e.target.value)}
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
                  value={correo}
                  onChange={(e) =>setCorreo(e.target.value)}
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
                  value={numeroContacto}
                  onChange={(e) =>setNumeroContacto(e.target.value)}
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
                  value={nit}
                  onChange={(e) =>setNit(e.target.value)}
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
                  value={direccion}
                  onChange={(e) =>setDireccion(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='btn btn-primary'>Editar</button>
            </form>


          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
  )
}

  
export default EditarClientes;