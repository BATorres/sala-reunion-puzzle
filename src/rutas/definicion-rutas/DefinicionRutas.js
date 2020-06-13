import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Inicio from "../Inicio/Inicio";
import PantallaInteractivaEditable from "../SalaReunion/SalaReunion";
import Login from "../Login/Login";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import ListarSalas from "../ListarSalas/ListarSalas";
import CrearSala from "../CrearSala/CrearSala";

class DefinicionRutas extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Inicio}/>
                <Route exact path="/admin/login" component={Login}/>
                <Route exact path="/admin/menu" component={MenuAdmin}/>
                <Route exact path="/admin/sala/:idSala" component={PantallaInteractivaEditable}/>
                <Route exact path="/admin/crear-sala" component={CrearSala}/>
                <Route exact path="/admin/listar-salas" component={ListarSalas}/>
                <Route exact path="/usuario/login" component={Login}/>
                <Route exact path="/usuario/listar-salas" component={ListarSalas}/>
                <Route exact path="/usuario/sala/:idSala" component={PantallaInteractivaEditable}/>
            </Router>
        )
    }
}

export default DefinicionRutas;