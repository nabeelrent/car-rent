import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAuth = () => {
    // Dummy authentication state for now
    // const authstate = { accessToken: "dummyAccessToken" }; // Replace with null to simulate an unauthenticated user

    // Redux-based logic, commented out
    const authstate = useSelector((state) => state.Auth);

    const location = useLocation();

    return (
        authstate?.accessToken != null
            ? <Outlet state={{ from: location }} />
            : <Navigate to="/" state={{ from: location.pathname }} replace />
    );
};

export default PrivateAuth;
