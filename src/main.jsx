import React from 'react'
import "./main.css"
import ReactDOM from 'react-dom/client'
import { Login } from './pages/Login/Login'
import { HomeUser } from './pages/HomeUser/HomeUser'
import { UserRestaurant } from './pages/UserRestaurant/UserRestaurant'
import { SaleRestaurant } from './pages/SaleRestaurant/SaleRestaurant'
import { DetailSalesRestaurant } from './pages/DetailSalesRestaurant/DetailSalesRestaurant'
import { UserWine } from './pages/UserWine/UserWine'
import { SaleWine } from './pages/SaleWine/SaleWine'
import { ConfirmationSaleWine } from './pages/ConfirmationSaleWine/ConfirmationSaleWine'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ListaVentas from './pages/UserRestaurant/Venta'
import Productos from './pages/products/Productos'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/HomeUser' element={<HomeUser/>}/>
        <Route path='/UserRestaurant' element={<UserRestaurant/>}/>
        <Route path='/SaleRestaurant' element={<SaleRestaurant/>}/>
        <Route path='/DetailSalesRestaurant' element={<DetailSalesRestaurant/>}/>
        <Route path='/UserWine' element={<UserWine/>}></Route>
        <Route path="/ventas/:id" element={<ListaVentas />} />
        <Route path='/productos' element={<Productos/>}/>
        <Route path='/SaleWine' element={<SaleWine/>}></Route>
        <Route path='/ConfirmationSaleWine' element={<ConfirmationSaleWine/>}></Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
