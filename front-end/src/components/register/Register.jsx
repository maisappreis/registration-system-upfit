import React, { Component } from "react";
import Main from "../template/Main";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
    icon: "address-book-o",
    title: "Cadatro de Clientes",
    subtitle: "Cadastramento dos clientes"
}

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registers: [],
            modalTitle: "",
            customerId: 0,
            customerName: "",
            frequency: "",
            startDate: "",
            plan: "",
            value: 0,
            note: "",

            registersWithoutFilter: []
        }
    }

    sortResult(prop, asc) {
        let sortedData = this.state.registersWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop] ? 1 : ((a[prop] < b[prop] ? -1 : 0)))
            } else {
                return (b[prop] > a[prop] ? 1 : ((b[prop] < a[prop] ? -1 : 0)))
            }
        });
        this.setState({ registers: sortedData })
    }

    refreshList() {
        fetch("http://127.0.0.1:8000/register")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ registers: data, registersWithoutFilter: data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeCustomerName = (e) => {
        this.setState({ customerName: e.target.value })
    }

    changeFrequency = (e) => {
        this.setState({ frequency: e.target.value })
    }

    changeStartDate = (e) => {
        this.setState({ startDate: e.target.value })
    }

    changePlan = (e) => {
        this.setState({ plan: e.target.value })
    }

    changeValue = (e) => {
        this.setState({ value: e.target.value })
    }

    changeNote = (e) => {
        this.setState({ note: e.target.value })
    }

    add() {
        this.setState({
            modalTitle: "Adicionar Cadastro",
            customerId: 0,
            customerName: "",
            frequency: "",
            startDate: "2022/08/01",
            plan: "",
            value: 0,
            note: ""
        });
    }

    edit(register) {
        this.setState({
            modalTitle: "Editar Cadastro",
            customerId: register.customerId,
            customerName: register.customerName,
            frequency: register.frequency,
            startDate: register.startDate,
            plan: register.plan,
            value: register.value,
            note: register.note
        })
    }

    create() {
        fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerName: this.state.customerName,
                frequency: this.state.frequency,
                startDate: this.state.startDate,
                plan: this.state.plan,
                value: this.state.value,
                note: this.state.note,
            })
        })
            .then(res => res.json())
            .then((res) => {
                toast(res);
                this.refreshList();
            })
    }

    update() {
        fetch("http://127.0.0.1:8000/register", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerId: this.state.customerId,
                customerName: this.state.customerName,
                frequency: this.state.frequency,
                startDate: this.state.startDate,
                plan: this.state.plan,
                value: this.state.value,
                note: this.state.note,
            })
        })
            .then(res => res.json())
            .then((res) => {
                toast(res);
                this.refreshList();
            })
    }

    delete(id) {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            fetch(`http://127.0.0.1:8000/register/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then((res) => {
                    toast(res);
                    this.refreshList();
                })
        }
    }


    render() {
        const {
            registers,
            modalTitle,
            customerId,
            customerName,
            frequency,
            startDate,
            plan,
            value,
            note } = this.state;

        return (
            <Main {...headerProps} >
                <ToastContainer/>
                <div>
                    <button type="button"
                        className="btn btn-primary m-2 mb-4 float-start"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.add()}>
                        Novo Cadastro
                    </button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Nome do Cliente
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("customerName", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("customerName", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Freq.
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("frequency", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("frequency", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Data de Início
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("startDate", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("startDate", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Plano
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("plan", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("plan", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Valor
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("value", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("value", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Observações
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("note", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("note", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th className="center">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map(register =>
                            <tr key={register.customerId}>
                                <td>{register.customerName}</td>
                                <td>{register.frequency}</td>
                                <td>{register.startDate}</td>
                                <td>{register.plan}</td>
                                <td>R$ {register.value},00</td>
                                <td>{register.note}</td>
                                <td className="center">
                                    <button type="button"
                                        className="btn btn-primary ml-1 btx"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.edit(register)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button type="button"
                                        className="btn btn-danger ml-1 btx"
                                        onClick={() => this.delete(register.customerId)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Nome do Cliente</label>
                                    <input type="text" className="form-control"
                                        value={customerName}
                                        onChange={this.changeCustomerName} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Frequência Semanal</label>
                                    <select className="form-select"
                                        value={frequency}
                                        onChange={this.changeFrequency} >
                                        <option value="" selected>Selecione</option>
                                        <option value="1x">1x</option>
                                        <option value="2x">2x</option>
                                        <option value="3x">3x</option>
                                        <option value="4x">4x</option>
                                        <option value="5x">5x</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" for="start">Data de Início</label>
                                    <input type="date" id="start" className="form-control"
                                        value={startDate}
                                        onChange={this.changeStartDate} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Plano</label>
                                    <select className="form-select"
                                        value={plan}
                                        onChange={this.changePlan}>
                                        <option value="" selected>Selecione</option>
                                        <option value="Mensal">Mensal</option>
                                        <option value="Trimestral">Trimestral</option>
                                        <option value="Semestral">Semestral</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Valor</label>
                                    <input type="text" className="form-control"
                                        value={value}
                                        onChange={this.changeValue} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Observações</label>
                                    <input type="text" className="form-control"
                                        value={note}
                                        onChange={this.changeNote} />
                                </div>

                                {customerId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.create()}>Salvar</button>
                                    : null}

                                {customerId > 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.update()}>Atualizar</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}