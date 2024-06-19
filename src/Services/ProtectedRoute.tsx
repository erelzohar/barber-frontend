import { Navigate } from "react-router-dom";
import store from "../Redux/Store";

interface protectedRouteProps{
    redirectPath:string;
    protectedComponent:JSX.Element;
}


export default function ProtectedRoute(props:protectedRouteProps){
    const isAuthenticated = store.getState().authState.admin;  
    if (!isAuthenticated) return <Navigate to={props.redirectPath} replace/>
    return props.protectedComponent;
}