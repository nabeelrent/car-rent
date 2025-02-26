import React, { useState } from 'react';
import { FaArrowLeft, FaHome, FaCog } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FaChevronDown, } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userlogout } from "../../store/AuthSlice";
import { IoRadioButtonOn, } from "react-icons/io5";
import { IoIosRadioButtonOff } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { SiMoneygram } from "react-icons/si";

import logo from '../../assets/logo/logo.png';



function SidebarBotConfiguration() {
  const menuData = [
    { name: "Balance sheet ", icon: <FaHome />, path: "/cars/expenses/", subMenu: null },

    { name: "Cars", icon: <FaCar />, path: "/cars/car-list/", subMenu: null },
    // { name: "Reve Type ", icon: <GiExpense />, path: "/cars/expenses-type/", subMenu: null },


    { name: "Revenue  ", icon: <GiReceiveMoney />, path: "/cars/revenue/", subMenu: null },

    { name: "Expense  ", icon: <SiMoneygram />, path: "/cars/expense-list/", subMenu: null },
    { name: "Expenses Type ", icon: <GiExpense />, path: "/cars/expenses-type/", subMenu: null },


   
  ];

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [currentMenu, setCurrentMenu] = useState("main");
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const handleMenuClick = (menu, index) => {
    console.log(menu,"menu-b");
    console.log(menu.path,"menu-b-pp");

    navigate(menu.path);
    // if (menu.subMenu) {
    //   setCurrentMenu(`submenu-${index}`);
    //   setSubmenuIndex(index);

    // } else if (menu.path) {

    //   navigate("/boatconfigure/");

     
    // }
  };

  const handleSubMenuClick = (menu) => {
    console.log(menu,"menu--003");
    
    if (menu) {
      navigate("/boatconfigure/");

     

    }
  };
  const [label, setlabel] = useState(true);
  const togglelabel = () => {
    setlabel((prev) => !prev);
  };
  const handleBackClick = () => {
    setCurrentMenu("main");
    setSubmenuIndex(null);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();

    dispatch(userlogout());
    navigate("/");
  };
  
  return (
    <>
     <div className='absolute top-0 md:left-24 transform -translate-x-1/2 mb-2 flex justify-center items-center'>
  <button className="flex justify-center items-center">
    <img className="md:w-24 md:h-16 w-20 h-10" src={logo} alt="" onClick={togglelabel} />
  </button>
</div>

      <div
        className={`hidden md:flex border-r-[1px] border-gray-600  ${label ? 'w-[212px]' : 'w-20'} min-h-screen  md:h-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all`}
      >


        <div
          className={`bg-gradient-to-r from-[#bf8327] via-[#a46f32] to-[#34291c] p-4 ${label ? 'w-64' : ''}  overflow-y-auto transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300`}
        >    


          {/* {currentMenu === "main" ? (

            <div className='flex w-full gap-2'>
             
            </div>
          ) : (
            <div className='flex w-full gap-2'>
              <div
                className="w-full bg-white hover:bg-gradient-color1 px-3 rounded-md text-lg p-1 text-black hover:text-white flex gap-3  items-center  cursor-pointer"
                onClick={handleBackClick}
              >
                {label ? (
                  <>
                    <FaArrowLeft className='' />
                    Back
                  </>
                ) : (
                  <FaArrowLeft className="w-5" />
                )}

              </div>
            
            </div>


          )} */}

          {/* Main Menu */}
          {currentMenu === "main" && (
            <div className="mt-3 space-y-4">
              {menuData.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center bg-gradient-buttoncolour1 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full hover:bg-white hover:text-black"
                  // className={`flex items-center  bg-gradient-buttoncolour1 text-white ${label ? 'px-4 py-2' : 'px-2 py-2 justify-center'} rounded-md hover:bg-gradient-color1 w-full`}
                  onClick={() => handleMenuClick(item, index)}
                >
                  <span className="mr-1">{item.icon}</span>
                  {label && item.name}

                </button>
              ))}
            </div>
          )}

          {/* Submenu */}
          {currentMenu.startsWith("submenu-") && submenuIndex !== null && (
            <div className="mt-6 space-y-4">
              {menuData[submenuIndex].subMenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className="flex items-center bg-gradient-buttoncolour1 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black w-full"
                  // onClick={() => navigate(subItem.path)}
                  onClick={() => handleSubMenuClick(subItem.path)}

                >
                  <span className="mr-1">{subItem.icon}</span>
                  {label && subItem.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Hamburger menu for mobile */}
      <div className="md:hidden fixed top-0 right-2 z-50">

        <button
          className="w-14 h-14 relative focus:outline-none rounded "
          onClick={toggleSidebar}
        >
          <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-7 text-black bg-current transform transition duration-500 ease-in-out ${isOpen ? 'rotate-45' : ' -translate-y-1.5'
                }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-7 text-black bg-current transform transition duration-500 ease-in-out ${isOpen ? 'opacity-0' : ''
                }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-7 text-black bg-current transform transition duration-500 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
            ></span>
          </div>
        </button>
      </div>


      {/* Mobile Drawer */}
      <div className={`bg-gray-200 w-64 h-screen p-4 fixed top-0 left-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform`}>
   

        {/* <div className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer" onClick={() => handleNavigation("/boat/boatlist")}>
          <FaArrowLeft />
          Chat Bot
        </div> */}

        {/* Dynamically rendered buttons for mobile */}

        {/* <div className="mt-6 flex flex-col space-y-4"> */}
        <div className="mt-6 flex flex-col space-y-4">
          {/* Top Section */}
          {/* {currentMenu === "main" ? (
            <div className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer" onClick={() => handleNavigation("/boat/boatlist")}> <FaArrowLeft />
              Chat Bot</div>
          ) : (
            <div
              className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer"
              onClick={handleBackClick}
            >
              <FaArrowLeft /> Back
            </div>
          )} */}

          {/* Main Menu */}
          {currentMenu === "main" && (
            <div className="mt-6 space-y-4">
              {menuData.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                  onClick={() => handleMenuClick(item, index)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {/* Submenu */}
          {currentMenu.startsWith("submenu-") && submenuIndex !== null && (
            <div className="mt-6 space-y-4">
              {menuData[submenuIndex].subMenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                  onClick={() => navigate(subItem.path)}
                >
                  {subItem.name}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default SidebarBotConfiguration;
