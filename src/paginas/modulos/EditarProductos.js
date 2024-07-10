import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";




const EditarProductos = () => {

  const navigate = useNavigate();

//Definimos los estados
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [numeroInvima, setNumeroInvima] = useState('');
  const [paisOrigen, setPaisOrigen] = useState('');
  const {id} = useParams();

  //Creamos nuestra función de modificar productos
  const ModificarProductos = async (e) =>{
    e.preventDefault();
    await APIInvoke.invokePUT(`/api/productos/${id}`,{
      nombre: nombre, marca: marca, tipo: tipo, 
      cantidad: cantidad, numeroInvima: numeroInvima, paisOrigen: paisOrigen
    })
    navigate('/productos');
  }
  useEffect(() =>{
    getProductos();
    // eslint-disable-next-line 
  },[]);

  const getProductos = async () =>{
    const response = await APIInvoke.invokePUT(`/api/productos/${id}`)
    setNombre(response.nombre);
    setMarca(response.marca);
    setTipo(response.tipo);
    setCantidad(response.cantidad);
    setNumeroInvima(response.numeroInvima);
    setPaisOrigen(response.paisOrigen);

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
            <form onSubmit={ModificarProductos}>
              <div className='form-group'>
                <label htmlFor="nombres">Nombre</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese su nombre'
                  id='nombre'
                  name='nombre'
                  value={nombre}
                  onChange={(e) =>setNombre(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor="apellidos">Marca</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese la marca'
                  id='marca'
                  name='marca'
                  value={marca}
                  onChange={(e) =>setMarca(e.target.value)}
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
                  value={tipo}
                  onChange={(e) =>setTipo(e.target.value)}
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
                  value={cantidad}
                  onChange={(e) =>setCantidad(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor="numeroInvima">Numero Invima</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Ingrese el número invima'
                  id='numeroInvima'
                  name='numeroInvima'
                  value={numeroInvima}
                  onChange={(e) =>setNumeroInvima(e.target.value)}
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
                  value={paisOrigen}
                  onChange={(e) =>setPaisOrigen(e.target.value)}
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

  
export default EditarProductos;