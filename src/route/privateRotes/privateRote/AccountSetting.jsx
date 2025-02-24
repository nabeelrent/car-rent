import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SidebarConfigure from '../../../sidebarconfigure/SidebarConfigure';
import Car from '../../../componets/cars/Car';
import Expenses from '../../../componets/Expenses/Expenses';
import ExpensesType from '../../../componets/ExpensesType/ExpensesType';
import Revenue from '../../../componets/revenue/Revenue';
import ExpenseNew from '../../../componets/expensenew/ExpenseNew';

function AccountSetting() {
    return (
        <SidebarConfigure>
            <Routes>
                <Route element={<PrivateAuth />}>
                    <Route exact path="car-list/" element={<Car />} />
                    <Route exact path="expenses/" element={<   Expenses />} />
                    <Route exact path="expenses-type/" element={<   ExpensesType />} />
                    <Route exact path="revenue/" element={<   Revenue />} />
                    <Route exact path="expense-list/" element={<   ExpenseNew />} />

          
                 
                </Route>
            </Routes>
        </SidebarConfigure>
    );
}

export default AccountSetting;
