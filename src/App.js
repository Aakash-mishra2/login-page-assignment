import LoginPage from "./login_page/loginpage";
import Dashboard
    from "./login_page/dashboard";
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AddCarPage from "./home/AddCarPage";
export default function App() {
    const isLoggedIn = useSelector((state) => state.userAccount.isLoggedIn);

    let routes;
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/car" element={<AddCarPage />} />
            </Routes>
        )
    }
    else {
        routes = (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/car" element={<AddCarPage />} />
            </Routes>
        )
    }
    return (
        <div>
            {routes}
        </div>
    )
}