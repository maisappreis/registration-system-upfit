import React, { Component } from "react";
import Main from "../template/Main";
import "./Expense.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
    icon: "usd",
    title: "Despesas",
    subtitle: "Contas mensais à pagar"
}

export default class Expense extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            modalTitle: "",
            expenseId: 0,
            expenseName: "",
            dueDate: "",
            value: 0,
            note: "",

            expensesWithoutFilter: []
        }
    }

    sortResult(prop, asc) {
        let sortedData = this.state.expensesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop] ? 1 : ((a[prop] < b[prop] ? -1 : 0)))
            } else {
                return (b[prop] > a[prop] ? 1 : ((b[prop] < a[prop] ? -1 : 0)))
            }
        });
        this.setState({ expenses: sortedData })
    }

    refreshList() {
        fetch("http://127.0.0.1:8000/expense")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ expenses: data, expensesWithoutFilter: data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeExpenseName = (e) => {
        this.setState({ expenseName: e.target.value })
    }

    changeDueDate = (e) => {
        this.setState({ dueDate: e.target.value })
    }

    changeValue = (e) => {
        this.setState({ value: e.target.value })
    }

    changeNote = (e) => {
        this.setState({ note: e.target.value })
    }

    add() {
        this.setState({
            modalTitle: "Adicionar Despesa",
            expenseId: 0,
            expenseName: "",
            dueDate: "",
            value: 0,
            note: ""
        });
    }

    edit(expense) {
        this.setState({
            modalTitle: "Editar Despesa",
            expenseId: expense.expenseId,
            expenseName: expense.expenseName,
            dueDate: expense.dueDate,
            value: expense.value,
            note: expense.note
        })
    }

    create() {
        fetch("http://127.0.0.1:8000/expense", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                expenseName: this.state.expenseName,
                dueDate: this.state.dueDate,
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
        fetch("http://127.0.0.1:8000/expense", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                expenseId: this.state.expenseId,
                expenseName: this.state.expenseName,
                dueDate: this.state.dueDate,
                value: this.state.value,
                note: this.state.note
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
            fetch(`http://127.0.0.1:8000/expense/${id}`, {
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

    calculateTotal(expenses) {
        return expenses.reduce((total, expense) => total + expense.value, 0)
    }



    render() {
        const {
            expenses,
            modalTitle,
            expenseId,
            expenseName,
            dueDate,
            value,
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
                        Nova Despesa
                    </button>
                </div>

                <table className="table table-striped" id="sumtable">
                    <thead>
                        <tr>
                            <th>
                                Despesa
                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("expenseName", true)}>
                                    <i className="fa fa-arrow-up"></i>
                                </button>

                                <button type="button" className="btn btn-light arrow"
                                    onClick={() => this.sortResult("expenseName", false)}>
                                    <i className="fa fa-arrow-down"></i>
                                </button>
                            </th>
                            <th>
                                Vencimento
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
                        {expenses.map(expense =>
                            <tr key={expense.expenseId}>
                                <td>{expense.expenseName}</td>
                                <td>{expense.dueDate}</td>
                                <td id="sumValue">R$ {expense.value}</td>
                                <td>{expense.note}</td>
                                <td className="center">
                                    <button type="button"
                                        className="btn btn-primary ml-1 btx"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.edit(expense)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button type="button"
                                        className="btn btn-danger ml-1 btx"
                                        onClick={() => this.delete(expense.expenseId)}>
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
                                    <label className="input-group-text">Despesa</label>
                                    <input type="text" className="form-control"
                                        value={expenseName}
                                        onChange={this.changeExpenseName} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" for="start">Vencimento</label>
                                    <input type="date" id="start" className="form-control"
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
                                    <label className="input-group-text">Observações</label>
                                    <input type="text" className="form-control"
                                        value={note}
                                        onChange={this.changeNote} />
                                </div>

                                {expenseId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.create()}>Salvar</button>
                                    : null}

                                {expenseId > 0 ?
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