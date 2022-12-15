import './Footer.css';
import React, { Component } from 'react';


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span>
                    Desenvolvido com <i className="fa fa-heart red"></i>por Maisa.
                </span>
            </footer>
        )
    }
}