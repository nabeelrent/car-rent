import React from 'react';
// import NavIcon from '../componets/botconfiguration/menu/NavIcon';
import SidebarBotConfiguration from '../componets/menu/SidebarBotConfiguration';

function SidebarConfigure({ children }) {


  return (
    <>


      <div className='md:flex  w-[100%]  '>
        {/* <NavIcon/> */}
        <SidebarBotConfiguration/>
        
        {children}
        
      </div>
    </>
  );
}

export default SidebarConfigure;
