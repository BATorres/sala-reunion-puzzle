import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PantallaInteractiva from "../PantallaInteractiva/PantallaInteractiva";
import Inicio from "../Inicio/Inicio";
import PantallaInteractivaEditable from "../PantallaInteractivaEditable/PantallaInteractivaEditable";
import PantallaInteractivaGlobal from "../PantallaInteractivaGlobal/PantallaInteractivaGlobal";

class Rutas extends Component {
    render() {
        return(
            <Router>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/admin" component={PantallaInteractivaGlobal} />
                <Route exact path="/usuario" component={PantallaInteractivaEditable} />
            </Router>
        )
    }
}

export default Rutas;