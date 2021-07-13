import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "../App";
import Clients from "../components/pages/clientes/ver/Clients";
import CreateClient from "../components/pages/clientes/crear/CreateClient";
import ViewQuotation from "../components/pages/cotizaciones/viewQuotation/ViewQuotation";
import Quotation from "../components/pages/cotizaciones/quotation/Quotation";
import CotiPDF from "../components/pages/cotizaciones/pdf/CotiPDF";
import Products from "../components/pages/products/Products";
import Inicio from "../components/pages/inicio/Inicio";
import FooterBlack from "../components/includes/footerBlack/FooterBlack";
import NavbarU from "../components/includes/navbarU/NavbarU";
import Solicitudes from "../components/pages/cotizaciones/requests/Solicitudes";
import VerOrdenes from "../components/pages/ordenes/ver/VerOrdenes";
import CrearOrdenes from "../components/pages/ordenes/crear/CrearOrdenes";
import EnvioPDF from "../components/pages/clientes/envioPDF/EnvioPDF";
import Create from "../components/pages/products/create/Create";
import Editar from "../components/pages/clientes/editar/Editar";
import OportunidadesClientes from "../components/pages/oportunidades/OportunidadesClientes";
import OportunidadesCrear from "../components/pages/oportunidades/OportunidadesCrear";
import Oportunidades from "../components/pages/oportunidades/Oportunidades";
import Ventas from "../components/pages/ventas/Ventas";
import Inventario from "../components/pages/inventario/Inventario";
import Login from "../components/Login";
import { Store } from "../store/store";
import Quotation2 from "../components/pages/cotizaciones2/Quotation2";
import EditarCotizacion from "../components/pages/cotizaciones/editar/EditarCotizacion";
import OrdenPdf from "../components/pages/ordenes/ordenPdf/OrdenPdf";


export const  AppRouter = () => {
    const [data, setData] = useState({
        Usuario:'',
        Logged:false
    })

    return (
    <Store.Provider value={[data, setData]}>
    <Router>
        <Fragment>
                <Switch>
                    <Route exact path="/cotizaciones/crear">
                        <NavbarU/>
                        <Quotation2/>
                        <FooterBlack/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/cotizaciones/ver">
                        <NavbarU/><ViewQuotation/><FooterBlack/>
                    </Route>
                    <Route exact path="/cotizaciones/solicitudes">
                        <NavbarU/><Solicitudes/><FooterBlack/>
                    </Route>
                    <Route exact path="/cotizaciones/pdf/:NoCoti">
                        <CotiPDF/><FooterBlack/>
                    </Route>
                    <Route exact path="/cotizaciones/editar/:NoCoti">
                        <NavbarU/><EditarCotizacion/><FooterBlack/>
                    </Route>
                    <Route exact path="/clientes/ver">
                        <NavbarU/><Clients/><FooterBlack/>
                    </Route>
                    <Route exact path="/clientes/crear">
                        <NavbarU/><CreateClient/><FooterBlack/>
                    </Route>
                    <Route exact path="/clientes/editar/:idCliente">
                        <NavbarU/><Editar/><FooterBlack/>
                    </Route>
                    <Route exact path="/clientes/envioPDF/:idCliente">
                        <EnvioPDF/><FooterBlack/>
                    </Route>
                    <Route exact path="/productos/ver">
                        <NavbarU/><Products/><FooterBlack/>
                    </Route>
                    <Route exact path="/productos/crear">
                        <NavbarU/><Create/><FooterBlack/>
                    </Route>
                    <Route exact path="/ordenes/ver">
                        <NavbarU/><VerOrdenes/><FooterBlack/>
                    </Route>
                    <Route exact path="/ordenes/ver/:id">
                        <NavbarU/><OrdenPdf/><FooterBlack/>
                    </Route>
                    <Route exact path="/ordenes/crear">
                        <NavbarU/><CrearOrdenes/><FooterBlack/>
                    </Route>
                    <Route exact path="/ventas">
                        <NavbarU/><Ventas/><FooterBlack/>
                    </Route>
                    <Route exact path="/inventario">
                        <NavbarU/><Inventario/><FooterBlack/>
                    </Route>
                    
                    <Route exact path="/oportunidades/crear">
                        <OportunidadesCrear/> <FooterBlack/>
                    </Route>
                    <Route exact path="/oportunidades">
                        <Oportunidades/> <FooterBlack/>
                    </Route>
                    <Route exact path="/oportunidades">
                        <Oportunidades/> <FooterBlack/>
                    </Route>
                    <Route exact path="/oportunidades/clientes">
                        <OportunidadesClientes/> <FooterBlack/>
                    </Route>
                    <Route exact path="/inicio">
                        <Inicio/><FooterBlack/>
                    </Route>
                    <Route path="/">
                        <App/>
                    </Route>
                </Switch>
                
        </Fragment>
    </Router>
    </Store.Provider>
    )
}

export default AppRouter;
