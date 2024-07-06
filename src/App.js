import { Fragment } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes, Navigate } from'react-router-dom';
import { Registro } from './paginas/auth/Registro';
import Login from './paginas/auth/Login';
import MostrarClientes from './paginas/modulos/MostrarClientes';
import AgregarClientes from './paginas/modulos/AgregarClientes';
import EditarClientes from './paginas/modulos/EditarClientes';
import MostrarProductos from './paginas/modulos/MostrarProductos';
import AgregarProductos from './paginas/modulos/AgregarProductos';
import RutasProtegidas from './paginas/auth/RutasProtegidas';
import EditarProductos from './paginas/modulos/EditarProductos';


//Importamos el componente


function App() {
  return (
    <div className="App">
      <Fragment>
        <BrowserRouter>  
          <Routes>
            <Route path='/' element = {<Navigate to="login"/>}/>
            <Route path='/login' exact element = {<Login/>}/>
            <Route path='/registro' exact element = {<Registro/>}/>
            <Route path='/home' exact element = {<RutasProtegidas element={<Home/>}/>}/>
            <Route path='/clientes' exact element = {<RutasProtegidas element={<MostrarClientes/>}/>}/>
            <Route path='/clientes/agregar' exact element = {<RutasProtegidas element={<AgregarClientes/>}/>}/>
            <Route path='/clientes/editar/:id' exact element = {<RutasProtegidas element={<EditarClientes/>}/>}/>
            <Route path='/productos' exact element = {<RutasProtegidas element= {<MostrarProductos/>}/>}/>
            <Route path='/productos/agregar' exact element = {<RutasProtegidas element={<AgregarProductos/>}/>}/>
            <Route path='productos/editar/:id' exact element = {<RutasProtegidas element={<EditarProductos/>}/>}/>
          </Routes>
        </BrowserRouter>
      </Fragment>      
    </div>
  );
}

export default App;
