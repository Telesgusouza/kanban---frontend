import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from "../Pages/LoginRegister";
import RedirectRoute from "../components/RedirectRoute";
import Home from "../Pages/Home";

export default function RoutesApp() {

    return (
        <BrowserRouter>        
            <Routes>
                <Route path="/registerAndLogin" element={ <RedirectRoute> <LoginRegister /> </RedirectRoute> } />
                <Route path="/" element={ <RedirectRoute> <Home /> </RedirectRoute> } />
            </Routes>
        </BrowserRouter>
    );
}