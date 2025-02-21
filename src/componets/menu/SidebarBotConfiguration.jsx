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

import logo from '../../assets/logo/logo.png';



function SidebarBotConfiguration() {
  const menuData = [
    { name: "Cars", icon: <FaHome />, path: "/cars/car-list/", subMenu: null },
    { name: "Expence", icon: <FaHome />, path: "/cars/expenses/", subMenu: null },
   
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
     <div className='absolute top-0 left-24 transform -translate-x-1/2 mb-2 flex justify-center items-center'>
  <button className="flex justify-center items-center">
    <img className="w-24 h-16" src={logo} alt="" onClick={togglelabel} />
  </button>
</div>

      <div
        className={`hidden md:flex border-r-[1px] border-gray-600  ${label ? 'w-[212px]' : 'w-20'} min-h-screen  md:h-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all`}
      >


        <div
          className={`bg-gradient-to-r from-[#B41749] to-[#387BBF]  p-4 ${label ? 'w-64' : ''}  overflow-y-auto transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300`}
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
        <div class="flex  justify-end items-center gap-2 mb-2">
          <div className='relative flex justify-start p-1 items-center bg-gray-300  w-28 h-9 rounded-full ' >
            <div className='flex items-center justify-start gap-2'>
              <div className='bg-gray-300 rounded-full  text-[#0085FF] flex items-center justify-center'>
                {/* <FaUserCircle /> */}
                <img className='w-8 h-8 mt-[2px] rounded-full' src='https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg' alt="" />

              </div>
              <span>Ajmal</span>
              {isDropdownOpen ? (
                <FaChevronUp className="text-[#003465] cursor-pointer" onClick={toggleDropdown} />
              ) : (
                <FaChevronDown className="text-[#003465] cursor-pointer" onClick={toggleDropdown} />
              )}                        </div>


            {isDropdownOpen && (
              <div className={`absolute z-50 right-0 top-9 w-56 h-[360px] bg-white shadow-md rounded-xl mt-2 overflow-hidden transition-transform duration-300 ease-in-out ${isDropdownOpen ? 'transform translate-y-0' : 'transform translate-y-[-20px] opacity-0'}`}>
                <div >
                  <div className=' border-b-[1px] border-gray-200 w-full  items-center  justify-start  flex gap-4 p-2'>
                    <div>
                      <img className='w-8 h-8  rounded-full' src='https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg' alt="" />

                    </div>
                    <div>
                      <p className="leading-tight m-0 text-xs font-semibold">Ajmal</p>
                      <span className="leading-tight m-0 text-xs text-[#0085FF] font-semibold">ajmal.p@stackerbee.com</span>
                    </div>
                  </div>

                  <div className='border-b-[1px] border-gray-200   w-full  '>
                    <div className='items-center  justify-start  flex gap-4 p-2'>
                      <div>
                        <CiSettings />
                      </div>
                      <div>
                        <p className="leading-tight m-0 text-xs cursor-pointer font-semibold" >Account Settings</p>
                      </div>
                    </div>

                    <div className='items-center  justify-start  flex gap-4 p-2 text-[#0085FF]'>
                      <div>
                        <MdOutlinePrivacyTip />

                      </div>
                      <div>
                        <p className="leading-tight m-0 text-xs text-[#0085FF] cursor-pointer font-semibold">Privacy . Terms</p>
                      </div>
                    </div>

                    <div className='items-center  justify-start  flex gap-4 p-2 text-[#0085FF]'>
                      <div className='font-semibold'>
                        <IoIosLogOut />

                      </div>
                      <div>
                        <p className="leading-tight m-0 text-xs text-[#0085FF] cursor-pointer font-semibold" onClick={handleLogout}>Log out</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='items-center text-sm  justify-start  flex gap-4 p-2'>
                      Switch Account
                    </div>
                    <div className='items-center text-sm  justify-start   gap-4 p-2 '>
                      <div className=' border-b-[1px] bg-[#F6F6F6] rounded-md border-gray-200 w-full mb-2 items-center  justify-start  flex gap-4 p-2'>
                        <div>
                          <p className="leading-tight m-0 text-xs font-semibold">Ajmal</p>
                          <span className="leading-tight m-0 text-xs text-[#0085FF] cursor-pointer font-semibold">ajmal.p@stackerbee.com</span>
                        </div>
                        <div className='flex items-center justify-end cursor-pointer'>
                          <IoRadioButtonOn />
                        </div>
                      </div>
                      <div className=' border-b-[1px] bg-[#F6F6F6] rounded-md border-gray-200 w-full mb-2 items-center  justify-start  flex gap-4 p-2'>
                        <div>
                          <p className="leading-tight m-0 text-xs font-semibold cursor-pointer">Ajmal 2</p>
                          <span className="leading-tight m-0 text-xs text-[#0085FF] font-semibold cursor-pointer">ajmal.p2@stackerbee.com</span>
                        </div>
                        <div className='flex items-center justify-end cursor-pointer'>
                          <IoIosRadioButtonOff />
                        </div>
                      </div>
                      <div className=' border-b-[1px] bg-[#F6F6F6] rounded-md border-gray-200 w-full mb-2 items-center justify-center  flex gap-4 p-2'>
                        <div className='flex justify-center font-semibold items-center cursor-pointer gap-2'>
                          <IoIosLogOut />
                          <span className="leading-tight m-0 text-xs text-[#0085FF] font-semibold">Log out of all accounts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* <div className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer" onClick={() => handleNavigation("/boat/boatlist")}>
          <FaArrowLeft />
          Chat Bot
        </div> */}

        {/* Dynamically rendered buttons for mobile */}

        {/* <div className="mt-6 flex flex-col space-y-4"> */}
        <div className="mt-6 flex flex-col space-y-4">
          {/* Top Section */}
          {currentMenu === "main" ? (
            <div className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer" onClick={() => handleNavigation("/boat/boatlist")}> <FaArrowLeft />
              Chat Bot</div>
          ) : (
            <div
              className="bg-white rounded-md text-lg p-1 text-black flex gap-3 items-center px-3 cursor-pointer"
              onClick={handleBackClick}
            >
              <FaArrowLeft /> Back
            </div>
          )}

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
