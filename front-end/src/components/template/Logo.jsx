import './Logo.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

export default class Logo extends Component {
    render() {
        return (
            <aside className="logo">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />
                </Link>
            </aside>
        )
    }
}
