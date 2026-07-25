import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import API from "../services/api";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>Admin Login</h1>

                <p>Login to manage customer leads</p>

                <form onSubmit={login}>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AdminLogin;