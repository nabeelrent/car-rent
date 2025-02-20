import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SidebarConfigure from '../../../sidebarconfigure/SidebarConfigure';

function AccountSetting() {
    return (
        <SidebarConfigure>
            <Routes>
                <Route element={<PrivateAuth />}>
                    {/* <Route exact path="profile-settings" element={<Profilesettings />} />
                    <Route exact path="theme-settings" element={<ThemeSettings />} /> */}

                    
                </Route>
            </Routes>
        </SidebarConfigure>
    );
}

export default AccountSetting;
