import './Nav.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Logo extends Component {
    render() {
        return (
            <aside className="menu-area">
                <nav className="menu">
                    <Link to="/register">
                        <i className="fa fa-address-book-o"></i> Cadastro
                    </Link>
                    <Link to="/payment">
                        <i className="fa fa-money"></i> Mensalidades
                    </Link>
                    <Link to="/expense">
                        <i className="fa fa-usd"></i> Despesas
                    </Link>
                </nav>
            </aside>)
    }
}
