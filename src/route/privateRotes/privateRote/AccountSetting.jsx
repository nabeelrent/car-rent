import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SidebarConfigure from '../../../sidebarconfigure/SidebarConfigure';
import Car from '../../../componets/cars/Car';
import Expenses from '../../../componets/Expenses/Expenses';
import ExpensesType from '../../../componets/ExpensesType/ExpensesType';

function AccountSetting() {
    return (
        <SidebarConfigure>
            <Routes>
                <Route element={<PrivateAuth />}>
                    <Route exact path="car-list/" element={<Car />} />
                    <Route exact path="expenses/" element={<   Expenses />} />
                    <Route exact path="expenses-type/" element={<   ExpensesType />} />

                    
                 
                </Route>
            </Routes>
        </SidebarConfigure>
    );
}

export default AccountSetting;
