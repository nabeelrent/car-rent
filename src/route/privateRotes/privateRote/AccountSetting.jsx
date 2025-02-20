import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SidebarConfigure from '../../../sidebarconfigure/SidebarConfigure';
import Car from '../../../componets/cars/Car';

function AccountSetting() {
    return (
        <SidebarConfigure>
            <Routes>
                <Route element={<PrivateAuth />}>
                    <Route exact path="car-list/" element={<Car />} />

                    
                </Route>
            </Routes>
        </SidebarConfigure>
    );
}

export default AccountSetting;
