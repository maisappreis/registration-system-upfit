import React, { Component } from "react";
import Main from "../template/Main";
import "./Payment.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
    icon: "money",
    title: "Mensalidades",
    subtitle: "Recebimento dos pagamentos referentes as mensalidades"
}

export default class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payments: [],
            modalTitle: "",
            paymentId: 0,
            paymentDate: "",
            customerName: "",
            plan: "",
            frequency: "",
            dueDate: 0,
            value: 0,
            status: "",
            note: "",

            paymentsWithoutFilter: []
        }
    }

    sortResult(prop, asc) {
        let sortedData = this.state.paymentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop] ? 1 : ((a[prop] < b[prop] ? -1 : 0)))
            } else {
                return (b[prop] > a[prop] ? 1 : ((b[prop] < a[prop] ? -1 : 0)))
            }
        });
        this.setState({ payments: sortedData })
    }

    refreshList() {
        fetch("http://127.0.0.1:8000/payment")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ payments: data, paymentsWithoutFilter: data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changePaymentDate = (e) => {
        this.setState({ paymentDate: e.target.value })
    }

    changeCustomerName = (e) => {
        this.setState({ customerName: e.target.value })
    }

    changePlan = (e) => {
        this.setState({ plan: e.target.value })
    }

    changeFrequency = (e) => {
        this.setState({ frequency: e.target.value })
    }

    changeDueDate = (e) => {
        this.setState({ dueDate: e.target.value })
    }

    changeValue = (e) => {
        this.setState({ value: e.target.value })
    }

    changeStatus = (e) => {
        this.setState({ status: e.target.value })
    }

    changeNote = (e) => {
        this.setState({ note: e.target.value })
    }

    add() {
        this.setState({
            modalTitle: "Adicionar Pagamento",
            paymentId: 0,
            paymentDate: "",
            customerName: "",
            plan: "",
            frequency: "",
            dueDate: 0,
            value: 0,
            status: "",
            note: ""
        });
    }

    edit(payment) {
        this.setState({
            modalTitle: "Editar Pagamento",
            paymentId: payment.paymentId,
            paymentDate: payment.paymentDate,
            customerName: payment.customerName,
            plan: payment.plan,
            frequency: payment.frequency,
            dueDate: payment.dueDate,
            value: payment.value,
            status: payment.status,
            note: payment.note
        })
    }

    create() {
        fetch("http://127.0.0.1:8000/payment", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paymentDate: this.state.paymentDate,
                customerName: this.state.customerName,
                plan: this.state.plan,
                frequency: this.state.frequency,
                dueDate: this.state.dueDate,
                value: this.state.value,
                status: this.state.status,
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
        fetch("http://127.0.0.1:8000/payment", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paymentId: this.state.paymentId,
                paymentDate: this.state.paymentDate,
                customerName: this.state.customerName,
                plan: this.state.plan,
                frequency: this.state.frequency,
                dueDate: this.state.dueDate,
                value: this.state.value,
                status: this.state.status,
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
            fetch(`http://127.0.0.1:8000/payment/${id}`, {
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
            payments,
            modalTitle,
            paymentId,
            paymentDate,
            customerName,
            plan,
            frequency,
            dueDate,
            value,
            status,
            note } = this.state;

        return (
            <Main {...headerProps} >
                <ToastContainer />
                <div>
                    <button type="button"
                        className="btn btn-primary m-2 mb-4 float-start"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.add()}>
                        Novo Pagamento
                    </button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Mês do Pgto
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("paymentDate", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("paymentDate", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
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
                                Dia Venc.
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("dueDate", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("dueDate", false)}>
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
                                STATUS
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("status", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("status", false)}>
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
                        {payments.map(payment =>
                            <tr key={payment.paymentId}>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.customerName}</td>
                                <td>{payment.plan}</td>
                                <td>{payment.frequency}</td>
                                <td>{payment.dueDate}</td>
                                <td>R$ {payment.value},00</td>
                                <td className={payment.status==="PAGO" ? "green" : "red"} key={payment}>{payment.status}</td>
                                <td>{payment.note}</td>
                                <td className="center">
                                    <button type="button"
                                        className="btn btn-primary ml-1 btx"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.edit(payment)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button type="button"
                                        className="btn btn-danger ml-1 btx"
                                        onClick={() => this.delete(payment.paymentId)}>
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
                                    <label className="input-group-text">Mês do Pagamento</label>
                                    <input type="date" className="form-control"
                                        value={paymentDate}
                                        onChange={this.changePaymentDate} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Nome do Cliente</label>
                                    <input type="text" className="form-control"
                                        value={customerName}
                                        onChange={this.changeCustomerName} />
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
                                    <label className="input-group-text" for="start">Dia do Vencimento</label>
                                    <input type="text" id="start" className="form-control"
                                        value={dueDate}
                                        onChange={this.changeDueDate} />
                                </div>

                                <div className="input-group mb-3">
                                    <label className="input-group-text">Valor</label>
                                    <input type="text" className="form-control"
                                        value={value}
                                        onChange={this.changeValue} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">STATUS</label>
                                    <select className="form-select"
                                        value={status}
                                        onChange={this.changeStatus} >
                                        <option value="" selected>Selecione</option>
                                        <option value="PAGO">PAGO</option>
                                        <option value="À PAGAR">À PAGAR</option>
                                        <option value="CANCELADO">CANCELADO</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Observações</label>
                                    <input type="text" className="form-control"
                                        value={note}
                                        onChange={this.changeNote} />
                                </div>

                                {paymentId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.create()}>Salvar</button>
                                    : null}

                                {paymentId > 0 ?
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