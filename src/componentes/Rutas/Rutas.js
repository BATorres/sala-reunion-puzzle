import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Inicio from "../Inicio/Inicio";
import PantallaInteractivaEditable from "../PantallaInteractivaEditable/PantallaInteractivaEditable";
import PantallaInteractivaGlobal from "../PantallaInteractivaGlobal/PantallaInteractivaGlobal";
import Login from "../Login/Login";
import io from "socket.io-client";

const socket = io('http://localhost:8081');

class Rutas extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Inicio}/>
                <Route exact path="/admin" component={PantallaInteractivaGlobal}/>
                <Route exact path="/admin/login" component={Login}/>
                <Route exact path="/usuario" component={PantallaInteractivaEditable}/>
                <Route exact path="/usuario/login" component={Login}/>
            </Router>
        )
    }
}

export default Rutas;