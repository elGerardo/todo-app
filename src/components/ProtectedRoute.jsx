import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    if(!localStorage.getItem("login")){
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute;