import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/register/Register";
import Payment from "./components/payment/Payment";
import Expense from "./components/expense/Expense";

const RoutesProp = props =>
    <Routes>
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/expense" element={<Expense />} />
        <Route path="*" element={<Payment />} />
    </Routes>

export default RoutesProp;