import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "../App";
import Navbar from "../components/includes/Navbar";
import ViewQuotation from "../components/pages/cotizaciones/viewQuotation/ViewQuotation";
import Quotation from "../components/pages/quotation/Quotation";


export const  AppRouter = () => {
    return (
    <Router>
        <Fragment>
            <Navbar/>
                <Switch>
                    <Route exact path="/cotizacion">
                    <Quotation/>
                    </Route>
                    <Route exact path="/cotizacion/ver">
                    <ViewQuotation/>
                    </Route>
                    <Route path="/">
                    <App/>
                    </Route>
                </Switch>
        </Fragment>
    </Router>
        
    )
}

export default AppRouter;
