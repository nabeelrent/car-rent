import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PublicRoutes from './route/public/PublicRoutes';

// import Navbar from "./componets/common/navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userlogout } from "../src/store/AuthSlice";
import AccountSetting from "./route/privateRotes/privateRote/AccountSetting";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (document.visibilityState === "hidden") {
        // Tab is being closed
        localStorage.clear();
        dispatch(userlogout());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);
  return (
      <Router>
        <Routes>
          {/* Public Routes without Navbar */}
          <Route path="/*" element={<PublicRoutes />} />



    




          <Route
            path="/account-settings/*"
            element={
              <>
                {/* <Navbar /> */}
                <AccountSetting />
              </>
            }
          />

  


      
          





        </Routes>
      </Router>
  );
}

export default App;
